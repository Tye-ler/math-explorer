Project title: Generative Polar Segment Explorer
Slug: generative-polar-segment-explorer

Core concept:
Interactive exploration of emergent geometric patterns created from repeated line segments whose anchors are placed on polar functions r = f(θ), with configurable local/global motion, mirrored rotation behavior, indexed endpoint-connection rules, and optional trail accumulation.

What should the user understand?
How complex geometric patterns can emerge from simple repeated line segments when polar placement, local/global rotation, symmetry, connection rules, and motion are combined.

What can the user manipulate?
- number of primary line segments
- primary line segment length
- primary line segment color
- placement mode
- polar function preset
- polar function amplitude / scale
- polar function parameter(s) such as harmonic count where relevant
- angular spacing / theta distribution
- base theta offset
- local rotation enabled
- local rotation speed
- normal or mirrored local rotation behavior
- global rotation enabled
- global rotation speed
- global movement / phase evolution of the polar function
- endpoint connection rules
- target segment offset for connections
- alternate / patterned connection behavior
- connector color
- trail on/off
- trail persistence
- reset / clear trails

What should be visualized?
- repeated primary line segments
- their anchor points placed using polar geometry
- their A and B endpoints
- optional connection lines between segment endpoints and/or center
- the resulting evolving geometric pattern
- optional trail accumulation over time

Target audience:
Anyone exploring emergent geometric pattern generation with simple trigonometric rules, polar curves, and symmetry/motion systems.

Single biggest learning outcome:
Understand how polar placement, endpoint-connection rules, and local/global motion combine to create complex emergent segment patterns.

Required controls:
- segment count
- segment length
- primary segment color
- placement mode
- polar function preset
- polar function scale / amplitude
- harmonic / function parameter controls where relevant
- base theta offset
- local rotation toggle
- local rotation speed
- mirrored local rotation toggle
- global rotation toggle
- global rotation speed
- global function/motion phase toggle or speed
- connector enable/disable
- connection type
- target segment offset
- alternate / every-other connection toggle
- connector color
- trail toggle
- trail persistence
- clear / reset

Required visuals:
- central origin
- primary line segments
- optional connection lines
- optional trails
- clean high-contrast rendering on dark background
- clear evolving pattern as controls change

Must-have presets:
- simple circle placement
- rotating polygon / ring
- disconnected rotating shards
- center-connected pinwheel
- petal-like pattern from polar harmonic placement
- dense bloom / woven trail pattern

Default visible features:
- primary segments visible
- dark background
- minimal guide clutter
- no excessive overlays by default

Default hidden features:
- trails off unless preset uses them
- connectors off unless preset uses them
- patterned/alternate connection mode off unless preset uses it

Preferred bounded v1 simplifications:
- one main canvas
- black background fixed
- bounded preset-based polar functions rather than arbitrary typed expressions
- explicit connection rule controls rather than arbitrary graph grammar
- limited set of global movement / polar phase behaviors
- no scripting language for custom rules
- no export system
- no multi-canvas architecture unless clearly necessary

What must be mathematically exact?
- polar placement calculations
- conversion from polar placement to Cartesian anchor positions
- local rotation
- mirrored local rotation logic
- global rotation
- phase / parameter evolution for the chosen polar function
- segment endpoint geometry
- endpoint connection topology based on selected rule and target offset

What can be approximate for UX?
- trail fade model
- visual accumulation brightness
- exact rendering density of persistence effects
- preset naming / aesthetic tuning
- minor label placement polish if labels are added later

Important layout / geometry invariants:
- main visualization should dominate the page
- controls should be organized by subsystem
- canvas should remain centered and responsive
- rendering should remain legible as the viewport changes
- avoid wasting horizontal space on controls if it reduces the main visualization too much

Mathematical / structural model that implementation should follow:
- each primary segment has an index i
- each segment has an angular parameter θ_i
- for polar placement, each segment anchor is computed from:
  - r_i = f(θ_i, t, parameters)
  - x_i = r_i cos(θ_i)
  - y_i = r_i sin(θ_i)
- each segment has an anchor point and an orientation
- each segment has endpoints A_i and B_i derived from anchor + orientation + segment length
- local rotation affects segment orientation
- global rotation affects the whole system orientation / frame
- global movement may evolve the polar function phase or parameterization over time
- connection rules operate on endpoint type plus target segment rule

Connection rule requirements:
Primary line segments have A and B endpoints.

Supported connection targets for v1:
- A → A
- B → B
- A → B
- A → center
- B → center

For segment-to-segment connections, the target must be rule-based rather than fixed-only.
Support at least:
- sequential offset +1
- sequential offset -1
- configurable integer offset ±k
- alternate / every-other connection mode

Interpretation example:
- “A → A with offset +1” means current segment A connects to the next segment’s A
- “B → B with offset -1” means current segment B connects to the previous segment’s B
- “alternate” means connections can skip every other segment or follow the selected pattern rule

Polar placement requirements:
The segments are not placed on generic Cartesian line functions.
They are placed using polar functions where radius depends on angle:
- r = f(θ)

Example:
- r = 5 cos(3θ)

For v1, support bounded preset-style polar functions rather than arbitrary typed formulas.
Good v1 preset families include:
- circle: r = R
- rose-like cosine harmonic: r = a cos(kθ)
- rose-like sine harmonic: r = a sin(kθ)
- optionally a small additional bounded family if implementation remains clean

Notes / constraints:
- Single self-contained HTML file
- No external libraries unless explicitly approved
- Must be easy to copy into the website repo for publishing
- The implementation plan should explicitly define the internal data model before coding
- The implementation plan should explicitly define how segment indexing, polar placement, endpoint computation, and connection targeting work

[presets & resets] | [polar sampling] | [motion] | [connectors]
[segments]         |                  |          | [trails] 
