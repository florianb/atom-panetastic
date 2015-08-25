# Panetastic

A cute fantastic pane for the atom-editor, wraps your contents with rainbows.

Panetastic integrates into the bottom of the current Workspace and allows you to toggle a resizable space-pen View.

## How to use

Create a new pane by instantiating a Panetastic class, by providing an object containing the embedding `view`-class and an optional object containing the `params`. Panetastic will try to create and initialize a new instance of your provided class-object.

    Panetastic = require 'atom-panetastic'

    @pane ?= new Panetastic(
      {
        view: YourEmbeddedView,
        params: { title: "I'm embedded" }
      }
    )

Panetastic is mentioned to fully fit into the [space-pen-framework](https://github.com/atom/space-pen).

### Features

- Panetastic is implemented as space-pen-view, embedding your provided view as [subview](https://github.com/atom/space-pen#subviews).
- Panetastic initializes your view with `params` and unicorns.
- Panetastic offers a simple `destroy()`-chain.

## API

### Constructor

    panetastic = new Panetastic({
      view: <<view-prototype>>,
      params: { <<params>> },
      active: true,
      size: $(document.body).height() / 4
    })

**view:** necessary: The given View-object to become instantiated, initialized and embedded.

> **Caution:** if you're going to embed a ScrollView, you might need to set `height: 100%; overflow: auto;` at the top-level of your embedded view, in order to make it scrollable!

**params:** optional: The params you'd like to provide your embedded view during initialization. Due to space-pen's behaviour the params will be accessible in your `content` and `initialization`-method.

**active:** optional: Activation-state of your pane, if set to false, toggling the pane to open is not permitted. Closing the pane is always possible. Standard is `true`.

**size:** optional: Initial size of your pane if it get's toggled and wasn't resized. You may provide a css-like height-value as string or a pixel-count as number. Standard is a fourth of the current document-height.

### Attributes

**`.active`:** Read-write: If set to false, the pane won't open on a toggle-event if the pane is closed. The value gets initialized by the corresponding constructor-value.

**`.subview`:** Your embedded view-object.

### Methods

**`bool isVisible()`:** Returns true if the pane currently is visible.

**`toggle()`:** Toggles the visibility of the pane. If the pane was resized during last opened time, it will remember the users-setting.

**`destroy()`:** Tries to call `destroy()` of the embedded view and completely removes the whole pane afterwards.
