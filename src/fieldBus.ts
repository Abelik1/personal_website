// Lets a hovered project card tell the background particle field to get restless around it.
export type Agitation = { el: HTMLElement; hue: number };

// pageHue tints every particle while a project page is open, so each page has its own colour.
export const fieldBus: { agitation: Agitation | null; pageHue: number | null } = { agitation: null, pageHue: null };

export const agitateField = (el: HTMLElement, hue: number) => {
  fieldBus.agitation = { el, hue };
};

export const calmField = (el: HTMLElement) => {
  if (fieldBus.agitation?.el === el) fieldBus.agitation = null;
};
