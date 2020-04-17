export interface ConfigurationInputInterface<T> {
    getValue(): T;
    setValue(value: T): void;
}
