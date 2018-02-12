import { RepositoryContext } from './repository.context';

export class QueryContext {
	public readonly repositories: RepositoryContext = new RepositoryContext();
}
