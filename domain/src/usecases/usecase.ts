import createDebug = require('debug');
const debug = createDebug('ebs:domain');

export interface UseCase<DATA, RESULT> {
    execute(data: DATA): Promise<RESULT>
}

export abstract class BaseUseCase<DATA, RESULT> implements UseCase<DATA, RESULT> {

    async execute(data: DATA): Promise<RESULT> {
        const name = this.constructor.name;

        debug(`Executing use case ${name}`);

        const validatedData = await this.validateData(data);
        const resultData = await this.innerExecute(validatedData);

        debug(`Executed use case ${name}`);

        return resultData;
    }

    protected async validateData(data: DATA): Promise<DATA> {
        return data;
    }

    protected abstract innerExecute(data: DATA): Promise<RESULT>
}
