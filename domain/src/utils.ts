import * as crypto from 'crypto';

export function md5(value: string): string {
    return crypto.createHash('md5').update(value, 'utf8').digest('hex').toLowerCase();
}

export function uniq<T>(items: T[]) {
    return items.filter((value, index, self) => self.indexOf(value) === index);
}

// export function seriesPromise<T, R>(arr: T[], iteratorFn: (item: T) => Promise<R>): Promise<R> {
//     return arr.reduce((p, item) => p.then(() => iteratorFn(item)), Promise.resolve(null));
// }

export function mapPromise<T, R>(keys: T[], callback: (key: T) => Promise<R>):
    Promise<Map<T, R>> {
    const tasks = keys.map(key => callback(key).then(result => ({ key, result })));

    return Promise.all(tasks)
        .then(results => {
            const response: Map<T, R> = new Map();

            for (let item of results) {
                response.set(item.key, item.result);
            }

            return response;
        });
}
