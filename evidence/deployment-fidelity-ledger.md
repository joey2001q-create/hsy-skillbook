# Demo deployment fidelity ledger

## Evidence

- TRAE reference: `evidence/reference/trae-1440x900.png`
- TRAE deployed render: `evidence/rendered/trae-online-1280x720.jpg`
- Jufcloud reference state: `evidence/reference/jufcloud-mouse-right.png`
- Jufcloud deployed render: `evidence/rendered/jufcloud-online-1280x720.jpg`
- Deployed routes: `http://38.76.205.234/trae/` and `http://38.76.205.234/jufcloud/`

The deployment screenshots use the in-app browser's available `1280x720` viewport. Existing same-viewport fidelity scores remain documented in the route-specific ledgers; this file records the deployment and the user-requested source-site control rather than claiming a new pixel similarity score.

## Difference ledger

| Area | Reference and deployed evidence | Result |
| --- | --- | --- |
| Layout | Both deployed heroes retain their original first-viewport composition. The new fixed control stays at the right-center edge and does not cover headings, navigation, primary actions, or the TRAE download panel. | Passed; the source-site control is an intentional addition. |
| Typography | Existing hero, navigation, and CTA typography was not changed. The new control uses a compact 14px/600 UI label with zero letter spacing. | Passed. |
| Color | TRAE uses a green source-site control matching its accent; Jufcloud uses a white/blue variant matching its hero palette. Existing page colors remain unchanged. | Passed. |
| Spacing | Desktop control size is `104x42px` with a 20px right gutter; the narrow-screen variant is `94x38px` with a 12px gutter. Browser checks found no horizontal overflow. | Passed. |
| Icon and assets | The source-site control uses the Lucide `ExternalLink` icon. TRAE rendered one WebGL canvas; Jufcloud rendered both character and shadow layers with all referenced image assets available. | Passed. |
| Responsive | Verified at deployed `1280x720` and local in-app browser `734x1324`. The control remained visible and separate from page actions in both views. | Passed; Jufcloud retains the reference site's intentionally fixed-width mobile crop. |
| Interaction | TRAE source link opened `https://www.trae.cn/` in a new tab. Jufcloud points to `https://www.jufcloud.com/`; pointer movement changed its scene transform to `rotateX(2.4deg) rotateY(4.6deg)`. | Passed. |

## Intentional deviation

The “原网站” control and its Lucide icon do not exist in either reference hero. They were added at the user's request and are the only visual change introduced by this deployment task.
