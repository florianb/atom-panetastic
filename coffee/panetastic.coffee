{View, $}= require('atom')

class Panetastic extends View
  @content: (params) ->
    @div class: 'panetastic', =>
      @div class: 'resize-handle',
        style: '''
          text-align: center;
          background:
          -webkit-linear-gradient(top, rgb(67, 72, 77), rgb(43, 47, 50));''', ->
        @span class: 'icon icon-primitive-dot'
      @subview 'contentView', params.contentView

  initialize: (params) ->
    @active = true
    @resized = false
    @visible = false
    @size = params.size || ($(document.body).height() / 3)
    @on 'mousedown', '.resize-handle', (e) => @resizeStarted(e)
    atom.themes.requireStyleSheet()

  resizeStarted: =>
    @resized = true unless @resized
    $(document.body).on 'mousemove', @resizeView
    $(document.body).on 'mouseup', @resizeStopped

  resizeStopped: =>
    $(document.body).off 'mousemove', @resizeView
    $(document.body).off 'mouseup', @resizeStopped

  resizeView: ({pageY}) =>
    @height($(document.body).height() - pageY)

  toggle: =>
    if @hasParent()
      @visible = false
      @detach()
    else
      if @active
        @visible = true
        atom.workspaceView.appendToBottom(this)
        @height(@size) unless @resized

module.exports = Panetastic
