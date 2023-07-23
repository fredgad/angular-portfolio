export const rotateC_X = (X, Y, Z, Zt, angle, A, B, C) => {
  if (Zt === 0) {
    return (X += angle);
  }

  if (Zt === 90) {
    if (Y === 0) {
      switch (X) {
        case 0:
          return (Y += -angle);
          break;
        case 90 || -270:
          return (Z += angle);
          break;
        case 180 || -180:
          return (Y += angle);
          break;
        case 270 || -90:
          return (Z += -angle);
      }
    } else if (Y === 90) {
      switch (X) {
        case 0:
          return (Y += -angle);
          break;
        case 90 || -270:
          return (Z += angle);
          break;
        case 180 || -180:
          return (Y += angle);
          break;
        case 270 || -90:
          return (Z += -angle);
      }
    }
  }
  // Zt 90
};
