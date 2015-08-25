{View, $} = require('atom-space-pen-views')

class Panetastic extends View
  @content: (params) ->
    @div class: 'panetastic', =>
      @div class: 'resize-handle', style: "text-align: center; background:
        -webkit-linear-gradient(top,
        rgb(67, 72, 77), rgb(43, 47, 50))", outlet: 'resizeHandle', =>
        @span class: 'icon icon-primitive-dot'
      @subview 'subview', new params.view(params.params)

  initialize: (params) ->
    params.active ?= true
    # active: allows to disable the opening through toggle
    @active = params.active
    @size = params.size
    @resized = false
    @on 'mousedown', '.resize-handle', (e) => @resizeStarted(e)

  resizeStarted: =>
    @resized = true unless @resized
    $(document.body).on 'mousemove', @resizeView
    $(document.body).on 'mouseup', @resizeStopped

  resizeStopped: =>
    $(document.body).off 'mousemove', @resizeView
    $(document.body).off 'mouseup', @resizeStopped

  resizeView: ({pageY}) =>
    @height($(document.body).height() - pageY)
    if @resizeHandle.height() > @height()
      @height(@resizeHandle.height())

  isVisible: =>
    @hasParent()

  toggle: =>
    if @isVisible()
      @detach()
    else
      if @active
        atom.workspace.addBottomPanel(
          this,
          visible: true
        )
        newSize = @size || ($(document.body).height() / 3)
        @height(newSize) unless @resized

  destroy: =>
    try
      @subview.destroy()
    @remove()

module.exports = Panetastic
