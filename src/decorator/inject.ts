import 'reflect-metadata';

const metadataKey = Symbol('inject');
Inject.metadataKey = metadataKey;

const containerKey = Symbol('container');
Inject.container = containerKey;

export function Inject(key: any) {
  return (target: object, propertyKey: string | symbol, parameterIndex: number) => {
    if (!propertyKey) {
      const methodParameters: { [key: number]: any } = Reflect.getMetadata(metadataKey, target) || [];
      methodParameters[parameterIndex] = key;
      Reflect.defineMetadata(metadataKey, methodParameters, target);
      return;
    }

    const constructorParameters: { [key: number]: any } =
      Reflect.getMetadata(metadataKey, target.constructor, propertyKey) || [];
    constructorParameters[parameterIndex] = key;

    Reflect.defineMetadata(metadataKey, constructorParameters, target.constructor, propertyKey);
  };
}
