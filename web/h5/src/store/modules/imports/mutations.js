import Vue from 'vue'

export const addImport = (state, imp) => {
  state.imports.push(imp)
  return state
}

export const syncImports = (state, imports) => {
  state.imports = imports
  return state
}

export const updateImport = (state, update) => {
  const index = state.imports.findIndex(i => i.id === update.import_id)
  const item = state.imports[index]
  if (!item) {
    return state
  }

  const updated = Vue.util.extend(item, update.updates)
  Vue.set(state.imports, index, updated)

  return state
}
