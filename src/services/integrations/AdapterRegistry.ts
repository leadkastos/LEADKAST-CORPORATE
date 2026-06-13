import { IIntegrationAdapter } from './types';
import { GoogleAdsAdapter } from './GoogleAdsAdapter';

class AdapterRegistry {
  private adapters: Map<string, IIntegrationAdapter> = new Map();

  constructor() {
    this.register(new GoogleAdsAdapter());
    // Register more adapters here as they are implemented
  }

  register(adapter: IIntegrationAdapter) {
    this.adapters.set(adapter.slug, adapter);
  }

  getAdapter(slug: string): IIntegrationAdapter | undefined {
    return this.adapters.get(slug);
  }

  getAllAdapters(): IIntegrationAdapter[] {
    return Array.from(this.adapters.values());
  }
}

export const adapterRegistry = new AdapterRegistry();
