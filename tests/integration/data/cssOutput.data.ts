export default
`:root {
  --sizes-32: 32.72; /* 32.72px spacer component */
  --sizes-40: 40;
  --sizes-60: 60;
  --sizes-80: 80;
  --sizes-plain-token: 200;
  --sizes-token-in-frame: 200;
  --sizes-token-in-group: 200;
  --sizes-in-variant-60: 60;
  --sizes-in-variant-90: 90;
  --sizes-in-variant-120: 120;
  --sizes-frame: 32;
  --sizes-rect: 32;
  --sizes-shape-in-component: 32; /* Should use 32px not 20 from inside shape */
  --breakpoints-lg: 1280;
  --breakpoints-sm: 768;
  --breakpoints-md: 1024;
  --spacing-10-top: 10;
  --spacing-10-right: 10;
  --spacing-10-bottom: 10;
  --spacing-10-left: 10;
  --spacing-mixed-top: 10;
  --spacing-mixed-right: 20;
  --spacing-mixed-bottom: 30;
  --spacing-mixed-left: 20;
  --spacing-top-top: 10;
  --spacing-top-right: 0;
  --spacing-top-bottom: 0;
  --spacing-top-left: 0;
  --borders-unsupported-gradient-borders-stroke-align: inside;
  --borders-unsupported-gradient-borders-dash-pattern: ;
  --borders-unsupported-gradient-borders-stroke-cap: none;
  --borders-unsupported-gradient-borders-stroke-join: miter;
  --borders-unsupported-gradient-borders-stroke-miter-limit: 4;
  --borders-unsupported-gradient-borders-stroke-weight: 1;
  --borders-unsupported-multiple-borders-stroke-align: inside;
  --borders-unsupported-multiple-borders-dash-pattern: 5,10;
  --borders-unsupported-multiple-borders-stroke-cap: none;
  --borders-unsupported-multiple-borders-stroke-join: miter;
  --borders-unsupported-multiple-borders-stroke-miter-limit: 4;
  --borders-unsupported-multiple-borders-stroke-weight: 1;
  --borders-unsupported-multiple-borders-stroke: rgba(255, 230, 0, 1);
  --borders-unsupported-image-borders-stroke-align: inside;
  --borders-unsupported-image-borders-dash-pattern: ;
  --borders-unsupported-image-borders-stroke-cap: none;
  --borders-unsupported-image-borders-stroke-join: miter;
  --borders-unsupported-image-borders-stroke-miter-limit: 4;
  --borders-unsupported-image-borders-stroke-weight: 1;
  --borders-single-stroke-align: inside;
  --borders-single-dash-pattern: ;
  --borders-single-stroke-cap: none;
  --borders-single-stroke-join: miter;
  --borders-single-stroke-miter-limit: 4;
  --borders-single-stroke-weight: 1;
  --borders-single-stroke: rgba(112, 141, 242, 1);
  --borders-single-style-stroke-align: inside;
  --borders-single-style-dash-pattern: ;
  --borders-single-style-stroke-cap: none;
  --borders-single-style-stroke-join: miter;
  --borders-single-style-stroke-miter-limit: 4;
  --borders-single-style-stroke-weight: 1;
  --borders-single-style-stroke: rgba(4, 74, 255, 1);
  --borders-dashed-outside-stroke-align: outside;
  --borders-dashed-outside-dash-pattern: 5,5,3,3;
  --borders-dashed-outside-stroke-cap: none;
  --borders-dashed-outside-stroke-join: miter;
  --borders-dashed-outside-stroke-miter-limit: 4;
  --borders-dashed-outside-stroke-weight: 1;
  --borders-dashed-outside-stroke: rgba(64, 255, 186, 1);
  --radius-5-radius-type: single;
  --radius-5-radii-top-left: 5;
  --radius-5-radii-top-right: 5;
  --radius-5-radii-bottom-right: 5;
  --radius-5-radii-bottom-left: 5;
  --radius-5-smoothing: 0;
  --radius-5-radius: 5;
  --radii-smoothing-radius: 10;
  --radii-smoothing-radius-type: single;
  --radii-smoothing-radii-top-left: 10;
  --radii-smoothing-radii-top-right: 10;
  --radii-smoothing-radii-bottom-right: 10;
  --radii-smoothing-radii-bottom-left: 10;
  --radii-smoothing-smoothing: 0.75;
  --radii-mixed-radius-type: mixed;
  --radii-mixed-radii-top-left: 5.5;
  --radii-mixed-radii-top-right: 10;
  --radii-mixed-radii-bottom-right: 15;
  --radii-mixed-radii-bottom-left: 20;
  --radii-mixed-smoothing: 0;
  --motion-move-in-type: move_in;
  --motion-move-in-duration: 0.5;
  --motion-move-in-easing: ease-in;
  --motion-move-in-easing-function-x1: 0.41999998688697815;
  --motion-move-in-easing-function-x2: 1;
  --motion-move-in-easing-function-y1: 0;
  --motion-move-in-easing-function-y2: 1;
  --motion-move-in-direction: left;
  --motion-dissolve-type: dissolve;
  --motion-dissolve-duration: 0.45;
  --motion-dissolve-easing: cubic-bezier;
  --motion-dissolve-easing-function-x1: 0.6968395709991455;
  --motion-dissolve-easing-function-x2: 0.06683959811925888;
  --motion-dissolve-easing-function-y1: 0.052326660603284836;
  --motion-dissolve-easing-function-y2: 0.9323266744613647;
  --motion-smart-type: smart_animate;
  --motion-smart-duration: 0.5;
  --motion-smart-easing: linear;
  --motion-smart-easing-function-x1: 0;
  --motion-smart-easing-function-x2: 1;
  --motion-smart-easing-function-y1: 0;
  --motion-smart-easing-function-y2: 1;
  --motion-push-type: push;
  --motion-push-duration: 0.5;
  --motion-push-easing: ease-in-back;
  --motion-push-easing-function-x1: 0.30000001192092896;
  --motion-push-easing-function-x2: 0.699999988079071;
  --motion-push-easing-function-y1: -0.05000000074505806;
  --motion-push-easing-function-y2: -0.5;
  --motion-push-direction: left;
  --colors-multiple-fills-0: rgba(64, 255, 186, 1);
  --colors-multiple-fills-1: rgba(0, 0, 0, 0.1);
  --colors-single-blue: rgba(4, 74, 255, 1);
  --colors-special-characters: rgba(64, 223, 80, 1); /* Emoji */
  --colors-special-characters-nderung: rgba(52, 86, 175, 1);
  --gradient-multiple-0-gradient-type: linear;
  --gradient-multiple-0-stops-0-position: 0;
  --gradient-multiple-0-stops-0-color: rgba(255, 184, 0, 1);
  --gradient-multiple-0-stops-1-position: 1;
  --gradient-multiple-0-stops-1-color: rgba(255, 184, 0, 1);
  --gradient-multiple-0-opacity: 1;
  --gradient-multiple-1-gradient-type: radial;
  --gradient-multiple-1-stops-0-position: 0;
  --gradient-multiple-1-stops-0-color: rgba(255, 255, 255, 1);
  --gradient-multiple-1-stops-1-position: 1;
  --gradient-multiple-1-stops-1-color: rgba(255, 255, 255, 1);
  --gradient-multiple-1-opacity: 1;
  --gradient-multiple-2-gradient-type: angular;
  --gradient-multiple-2-stops-0-position: 0;
  --gradient-multiple-2-stops-0-color: rgba(207, 48, 48, 1);
  --gradient-multiple-2-stops-1-position: 1;
  --gradient-multiple-2-stops-1-color: rgba(255, 255, 255, 1);
  --gradient-multiple-2-opacity: 1;
  --gradient-multiple-3-gradient-type: diamond;
  --gradient-multiple-3-stops-0-position: 0;
  --gradient-multiple-3-stops-0-color: rgba(74, 79, 204, 1);
  --gradient-multiple-3-stops-1-position: 1;
  --gradient-multiple-3-stops-1-color: rgba(255, 255, 255, 1);
  --gradient-multiple-3-opacity: 1;
  --gradient-single-with-multiple-color-stops-gradient-type: radial;
  --gradient-single-with-multiple-color-stops-stops-0-position: 0;
  --gradient-single-with-multiple-color-stops-stops-0-color: rgba(255, 184, 0, 1);
  --gradient-single-with-multiple-color-stops-stops-1-position: 0.34;
  --gradient-single-with-multiple-color-stops-stops-1-color: rgba(255, 138, 0, 1);
  --gradient-single-with-multiple-color-stops-stops-2-position: 0.65;
  --gradient-single-with-multiple-color-stops-stops-2-color: rgba(255, 46, 0, 1);
  --gradient-single-with-multiple-color-stops-stops-3-position: 1;
  --gradient-single-with-multiple-color-stops-stops-3-color: rgba(255, 0, 0, 1);
  --gradient-single-with-multiple-color-stops-opacity: 1;
  --grid-multiple-0-pattern: columns;
  --grid-multiple-0-section-size: 1;
  --grid-multiple-0-gutter-size: 20;
  --grid-multiple-0-alignment: max;
  --grid-multiple-0-count: 7;
  --grid-multiple-0-offset: 3;
  --grid-multiple-1-pattern: columns;
  --grid-multiple-1-section-size: 12;
  --grid-multiple-1-gutter-size: 20;
  --grid-multiple-1-alignment: center;
  --grid-multiple-1-count: 6;
  --grid-multiple-2-pattern: columns;
  --grid-multiple-2-gutter-size: 20;
  --grid-multiple-2-alignment: stretch;
  --grid-multiple-2-count: 5;
  --grid-multiple-2-offset: 10;
  --grid-multiple-3-pattern: columns;
  --grid-multiple-3-section-size: 34;
  --grid-multiple-3-gutter-size: 20;
  --grid-multiple-3-alignment: min;
  --grid-multiple-3-count: 4;
  --grid-multiple-3-offset: 13;
  --grid-multiple-4-pattern: rows;
  --grid-multiple-4-section-size: 8;
  --grid-multiple-4-gutter-size: 20;
  --grid-multiple-4-alignment: max;
  --grid-multiple-4-count: 5;
  --grid-multiple-4-offset: 10;
  --grid-multiple-5-pattern: rows;
  --grid-multiple-5-section-size: 8;
  --grid-multiple-5-gutter-size: 10;
  --grid-multiple-5-alignment: center;
  --grid-multiple-5-count: 4;
  --grid-multiple-6-pattern: rows;
  --grid-multiple-6-section-size: 8;
  --grid-multiple-6-gutter-size: 20;
  --grid-multiple-6-alignment: min;
  --grid-multiple-6-count: 3;
  --grid-multiple-6-offset: 10;
  --grid-multiple-7-pattern: grid;
  --grid-multiple-7-section-size: 8;
  --grid-single-pattern: columns;
  --grid-single-section-size: 11;
  --grid-single-gutter-size: 20;
  --grid-single-alignment: center;
  --grid-single-count: 5;
  --body-h3-font-size: 20;
  --body-h3-text-decoration: none;
  --body-h3-font-family: Akzidenz-Grotesk Pro;
  --body-h3-font-weight: 700;
  --body-h3-font-style: normal;
  --body-h3-font-stretch: condensed;
  --body-h3-font-style-old: Bold Condensed;
  --body-h3-letter-spacing: 2;
  --body-h3-line-height: 160;
  --body-h3-paragraph-indent: 5;
  --body-h3-paragraph-spacing: 8;
  --body-h3-text-case: uppercase;
  --body-h4-strike-through-font-size: 16;
  --body-h4-strike-through-text-decoration: line-through;
  --body-h4-strike-through-font-family: Roboto;
  --body-h4-strike-through-font-weight: 500;
  --body-h4-strike-through-font-style: italic;
  --body-h4-strike-through-font-stretch: normal;
  --body-h4-strike-through-font-style-old: Medium Italic;
  --body-h4-strike-through-letter-spacing: 0;
  --body-h4-strike-through-line-height: normal;
  --body-h4-strike-through-paragraph-indent: 0;
  --body-h4-strike-through-paragraph-spacing: 0;
  --body-h4-strike-through-text-case: none;
  --body-italic-font-size: 12;
  --body-italic-text-decoration: none;
  --body-italic-font-family: Roboto;
  --body-italic-font-weight: 400;
  --body-italic-font-style: italic;
  --body-italic-font-stretch: normal;
  --body-italic-font-style-old: Italic;
  --body-italic-letter-spacing: 0;
  --body-italic-line-height: normal;
  --body-italic-paragraph-indent: 0;
  --body-italic-paragraph-spacing: 0;
  --body-italic-text-case: none;
  --body-extra-bold-condensed-italic-font-size: 12;
  --body-extra-bold-condensed-italic-text-decoration: none;
  --body-extra-bold-condensed-italic-font-family: Akzidenz-Grotesk Pro;
  --body-extra-bold-condensed-italic-font-weight: 800;
  --body-extra-bold-condensed-italic-font-style: italic;
  --body-extra-bold-condensed-italic-font-stretch: condensed;
  --body-extra-bold-condensed-italic-font-style-old: Extra Bold Condensed Italic;
  --body-extra-bold-condensed-italic-letter-spacing: 0;
  --body-extra-bold-condensed-italic-line-height: normal;
  --body-extra-bold-condensed-italic-paragraph-indent: 0;
  --body-extra-bold-condensed-italic-paragraph-spacing: 0;
  --body-extra-bold-condensed-italic-text-case: none;
  --body-medium-extended-italic-font-size: 20;
  --body-medium-extended-italic-text-decoration: none;
  --body-medium-extended-italic-font-family: Akzidenz-Grotesk Pro;
  --body-medium-extended-italic-font-weight: 500;
  --body-medium-extended-italic-font-style: italic;
  --body-medium-extended-italic-font-stretch: expanded;
  --body-medium-extended-italic-font-style-old: Medium Extended Italic;
  --body-medium-extended-italic-letter-spacing: 0;
  --body-medium-extended-italic-line-height: normal;
  --body-medium-extended-italic-paragraph-indent: 0;
  --body-medium-extended-italic-paragraph-spacing: 0;
  --body-medium-extended-italic-text-case: none;
  --body-super-font-size: 22;
  --body-super-text-decoration: none;
  --body-super-font-family: Akzidenz-Grotesk Pro;
  --body-super-font-weight: 900;
  --body-super-font-style: normal;
  --body-super-font-stretch: normal;
  --body-super-font-style-old: Super;
  --body-super-letter-spacing: 0;
  --body-super-line-height: normal;
  --body-super-paragraph-indent: 0;
  --body-super-paragraph-spacing: 0;
  --body-super-text-case: none;
  --effect-drop-shadow-single-type: dropShadow;
  --effect-drop-shadow-single-radius: 4;
  --effect-drop-shadow-single-color: rgba(0, 0, 0, 0.25);
  --effect-drop-shadow-single-offset-x: 0;
  --effect-drop-shadow-single-offset-y: 4;
  --effect-drop-shadow-single-spread: 0;
  --effect-inner-shadow-multiple-0-type: innerShadow;
  --effect-inner-shadow-multiple-0-radius: 4;
  --effect-inner-shadow-multiple-0-color: rgba(0, 0, 0, 0.25);
  --effect-inner-shadow-multiple-0-offset-x: 0;
  --effect-inner-shadow-multiple-0-offset-y: 4;
  --effect-inner-shadow-multiple-0-spread: 0;
  --effect-inner-shadow-multiple-1-type: innerShadow;
  --effect-inner-shadow-multiple-1-radius: 1;
  --effect-inner-shadow-multiple-1-color: rgba(0, 0, 0, 1);
  --effect-inner-shadow-multiple-1-offset-x: 10;
  --effect-inner-shadow-multiple-1-offset-y: 100;
  --effect-inner-shadow-multiple-1-spread: 0.5;
  --effect-inner-shadow-multiple-2-type: innerShadow;
  --effect-inner-shadow-multiple-2-radius: 3;
  --effect-inner-shadow-multiple-2-color: rgba(0, 0, 0, 0.25);
  --effect-inner-shadow-multiple-2-offset-x: -4;
  --effect-inner-shadow-multiple-2-offset-y: 2;
  --effect-inner-shadow-multiple-2-spread: 11;
  --effect-layer-blur-type: layerBlur;
  --effect-layer-blur-radius: 4;
  --effect-background-blur-type: backgroundBlur;
  --effect-background-blur-radius: 4;
}`
