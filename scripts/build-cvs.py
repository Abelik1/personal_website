"""Generate the two public CVs from content.ts via build-cvs.mjs. Requires reportlab."""
import json
import sys
from pathlib import Path
from html import escape
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether

data = json.load(sys.stdin)
ink, muted, accent = colors.HexColor('#192820'), colors.HexColor('#54625b'), colors.HexColor('#32674e')
styles = {
    'title': ParagraphStyle('title', fontName='Helvetica-Bold', fontSize=25, leading=30, textColor=ink, spaceAfter=6),
    'subtitle': ParagraphStyle('subtitle', fontName='Helvetica', fontSize=11, leading=15, textColor=accent, spaceAfter=10),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=9, leading=13, textColor=ink, spaceAfter=5),
    'small': ParagraphStyle('small', fontName='Helvetica', fontSize=8, leading=11, textColor=muted, spaceAfter=5),
    'heading': ParagraphStyle('heading', fontName='Helvetica-Bold', fontSize=9, leading=13, textColor=accent, spaceBefore=14, spaceAfter=8),
    'role': ParagraphStyle('role', fontName='Helvetica-Bold', fontSize=10, leading=13, textColor=ink, spaceAfter=3),
    'date': ParagraphStyle('date', fontName='Helvetica', fontSize=8, leading=12, textColor=muted, alignment=TA_RIGHT),
    'bullet': ParagraphStyle('bullet', fontName='Helvetica', fontSize=8.5, leading=12, textColor=ink, leftIndent=9, firstLineIndent=-9, spaceAfter=3)
}

def clean(text):
    return escape(text.replace('\u2013', '-').replace('\u2014', ',').replace('\u2011', '-'))

def p(text, style='body'):
    return Paragraph(clean(text), styles[style])

def heading(text):
    return p(text.upper(), 'heading')

def footer(canvas, doc):
    canvas.setStrokeColor(colors.HexColor('#cdd8d0'))
    canvas.line(42, 36, A4[0]-42, 36)
    canvas.setFont('Helvetica', 7)
    canvas.setFillColor(muted)
    canvas.drawString(42, 24, 'Alexander Belik | ' + data['profile']['email'])
    canvas.drawRightString(A4[0]-42, 24, str(doc.page))

out = Path('public/documents')
out.mkdir(parents=True, exist_ok=True)
for kind in ['software', 'physics']:
    title = 'Software Engineering | AI Systems | Scientific Computing' if kind == 'software' else 'Theoretical Physics | Quantum Thermodynamics | Scientific Computing'
    story = [p(data['profile']['name'], 'title'), p(title, 'subtitle')]
    profile = data['profile']
    links = f'{clean(profile["location"])} | <link href="mailto:{profile["email"]}">{profile["email"]}</link> | <link href="{profile["github"]}">GitHub: Abelik1</link> | <link href="{profile["linkedin"]}">LinkedIn</link>'
    story += [Paragraph(links, styles['small']), heading('Profile'), p('Theoretical physics graduate and current M.Sc. High-Performance Computing student at Trinity College Dublin. ' + profile['intro'])]
    story += [heading('Education')]
    for item in data['education'][:2]:
        story += [p(item['title'], 'role'), p(item['detail'], 'small')]
    story += [heading('Experience')]
    for item in sorted(data['experiences'], key=lambda x:x['start'], reverse=True):
        role = Table([[p(item['role'], 'role'), p(item['period'], 'date')]], colWidths=[370, 141])
        role.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'), ('LEFTPADDING',(0,0),(-1,-1),0), ('RIGHTPADDING',(0,0),(-1,-1),0), ('BOTTOMPADDING',(0,0),(-1,-1),0), ('TOPPADDING',(0,0),(-1,-1),0)]))
        story.append(KeepTogether([role, p(item['place'], 'small')] + [p('- ' + text, 'bullet') for text in item['details']] + [Spacer(1,8)]))
    story += [PageBreak(), p('Selected work', 'title'), p(title, 'subtitle')]
    selected = ['home', 'workspace', 'lab', 'hpc', 'assistant'] if kind == 'software' else ['thesis', 'quantum', 'hpc', 'spectroscopy', 'chemistry']
    for visual in selected:
        project = next(x for x in data['projects'] if x['visual'] == visual)
        block = [heading(project['eyebrow']), p(project['title'] + (' (in progress)' if project.get('status') else ''), 'role'), p(project['short'])]
        block += [p('- ' + text, 'bullet') for text in project['built'][:2]]
        block += [p('Tools: ' + ', '.join(project['stack']), 'small')]
        if project.get('link'):
            href = project['link']['href']
            if href.startswith('https:'):
                block += [Paragraph(f'<link href="{escape(href)}" color="#32674e">{clean(project["link"]["label"])}</link>', styles['small'])]
        story.append(KeepTogether(block))
    file = out / f'alexander-belik-{kind}-cv.pdf'
    doc = SimpleDocTemplate(str(file), pagesize=A4, rightMargin=42, leftMargin=42, topMargin=38, bottomMargin=48, title=f'Alexander Belik | {kind.title()} CV', author='Alexander Belik')
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(file)
