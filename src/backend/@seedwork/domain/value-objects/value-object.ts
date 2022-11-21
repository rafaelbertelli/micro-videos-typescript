export abstract class ValueObject<Value = any> {
  constructor(private readonly data: Value) {
    this.data = data;
  }

  get value(): Value {
    return this.data;
  }

  public toString(): string {
    if (typeof this.value !== 'object' || this.value === null) {
      try {
        return this.value.toString();
      } catch (e) {
        return `${this.value}`;
      }
    }

    return JSON.stringify(this.value);
  }
}
