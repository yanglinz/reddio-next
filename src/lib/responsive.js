export function parseResponsive(prop) {
  if (!Array.isArray(prop)) {
    return { mobile: prop, tablet: prop, desktop: prop };
  }

  switch (prop.length) {
    case 1: {
      return { mobile: prop[0], tablet: prop[0], desktop: prop[0] };
    }
    case 2: {
      return { mobile: prop[0], tablet: prop[1], desktop: prop[1] };
    }
    case 3: {
      return { mobile: prop[0], tablet: prop[1], desktop: prop[2] };
    }
    default: {
      throw new Error("Invalid dynamic prop");
    }
  }
}
