# Extended Case

This is an extended demo example designed to help developers learn and use the JLCPCB EDA API. It covers interfaces such as pop-up windows, buttons, and adding, deleting, modifying, and querying graphics primitives. Its functions are only for illustrative learning purposes.

Extended Case // This case is valid for both schematics and PCBs
    |————Re-randomly assign reference designators
    |————Batch add component properties...   // Click to pop up a window, enter the property name and property value, and apply to all components after confirmation
    |————Batch place text...   // Click to pop up a window, enter the text, quantity, and spacing, and it will be automatically placed on the canvas with the default font
    |————Delete graphics primitives...   // Click to pop up a window, check the graphics primitives, and delete all primitives of the same type after confirmation. Canvas primitives: `Components, Wires, Texts, Ports` (schematic); `Components, Wires, Pads, Vias, Copper pours, Fills, Lines, Texts` (PCB)
    |————Graphics primitives statistics...   // Click to pop up a window showing the canvas primitives and their corresponding quantities.  Canvas primitives: `Components, Wires, Texts, Ports` (schematic); `Components, Wires, Pads, Vias, Copper pours, Fills, Lines, Texts` (PCB)
