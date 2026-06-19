import type { ModelsDevModel } from '../models-dev-fetcher'

export interface ModelInfoEnricher {
  shouldSkipModel(modelId: string): boolean
  applyModelInfo(modelConfig: any, modelId: string): void
}

export interface ModelInfoEnricherOptions {
  filterNonChat: boolean
  modelsDevCache?: Map<string, ModelsDevModel>
}
