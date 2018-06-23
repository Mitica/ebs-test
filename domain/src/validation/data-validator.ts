
export type DataValidationResult<T=void> = {
    valid: boolean
    errors?: DataValidationError[]
    result?: T
}

export type DataValidationError = {
    message: string
    name?: string
    code?: string
    statusCode?: number

    details?: string
}

export interface DataValidator<T, R=T> {
    validate(data: T): Promise<DataValidationResult<R>>
}
