{domView, colCount} = require('/_common') 0, 'LEVEL_EDITOR'

updateDivTile$ = require '/app/view/updateDivTile$'

require('/app/controller/applyLevelEditorController$') {
  readBoardState: require '/app/core/readBoardState'
  updateDomView$: require('/app/view/updateDomView$') {
    setPlayerDivPosition$: require('/app/view/setPlayerDivPosition$') {
      setTranslation$: require '/app/view/setTranslation$'
    }
    updateDivTile$
    setTranslation$: require '/app/view/setTranslation$'
  }
  makeCoreState: require '/app/core/makeCoreState'
  updateDivTile$
  myStorage: require('/app/util/myStorage') {
    version: require '/app/version'
  }
  domView
  colCount
}
