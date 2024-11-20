import { BadRequestError } from "../errors"

export class TypeChecker {
    private prop: string;
    private value: any;
    constructor(prop: string, value: any) {
        this.prop = prop;
        this.value = value;
    }
    static check(prop: string, value: any) {
        return new TypeChecker(prop, value);
    }
    isString() {
        if (typeof this.value !== 'string') {
            throw new BadRequestError(`${this.prop} must be a string`);
        }
        return this;
    }
    isNumber() {
        if (typeof this.value !== 'number') {
            throw new BadRequestError(`${this.prop} must be a number`);
        }
        return this;
    }
    isBoolean() {
        if (typeof this.value !== 'boolean') {
            throw new BadRequestError(`${this.prop} must be a boolean`);
        }
        return this;
    }
    isNonEmptyString() {
        if (typeof this.value !== 'string' || this.value.trim() === '') {
            throw new BadRequestError(`${this.prop} must be a non-empty string`);
        }
        return this;
    }
    min(min: number) {
        if (typeof this.value !== 'number' || this.value < min) {
            throw new BadRequestError(`${this.prop} must be greater than or equal to ${min}`);
        }
        return this;
    }
    max(max: number) {
        if (typeof this.value !== 'number' || this.value > max) {
            throw new BadRequestError(`${this.prop} must be less than or equal to ${max}`);
        }
        return this;
    }
    isArray() {
        if (!Array.isArray(this.value)) {
            throw new BadRequestError(`${this.prop} must be an array`);
        }
        return this;
    }
}