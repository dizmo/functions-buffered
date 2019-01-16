/* tslint:disable:max-classes-per-file */
import { expect } from "chai";
import { buffered } from "../lib";

import "@babel/polyfill";
import "mocha";

describe("buffered.decorator", () => {
    it("should exist", () => {
        expect(buffered.decorator).to.not.be.an("undefined");
    });
    it("should be a function", () => {
        expect(buffered.decorator).to.be.a("function");
    });
});

describe("buffered.decorator", () => {
    it("should return a buffered function", () => {
        class Class {
            @buffered.decorator
            public fn() {
                expect(true).to.eq(true);
            }
        }
        expect(new Class().fn).to.be.a("function");
    });

    it("should preserve `this` correctly", (done) => {
        class Class {
            @buffered.decorator(0)
            public fn() {
                expect(this).to.be.an("object");
                expect(this instanceof Class).to.eq(true);
                done();
            }
        }
        new Class().fn();
    });

    it("should preserve `this` correctly", (done) => {
        class Class {
            @buffered.decorator(0)
            public fn(this: any) {
                expect(this).to.be.an("object");
                expect(this.key).to.eq(true);
                done();
            }
        }
        new Class().fn.bind({key: true})();
    });

    it("should buffer invocations", (done) => {
        class Accumulator {
            public n = 0;
            @buffered.decorator(5)
            public fn() {
                this.n += 1;
            }
        }

        const acc = new Accumulator();
        expect(acc.n).to.eq(0);
        expect(acc.fn).to.be.a("function");

        const id = setInterval(() => {
            expect(acc.n).to.eq(0);
            acc.fn(); acc.fn(); acc.fn();
            expect(acc.n).to.eq(0);
        }, 1);

        setTimeout(() => {
            expect(acc.n).to.eq(0);
            clearInterval(id);
            expect(acc.n).to.eq(0);

            setTimeout(() => {
                expect(acc.n).to.eq(0);
            }, 1);
            expect(acc.n).to.eq(0);

            setTimeout(() => {
                expect(acc.n).to.eq(1); done();
            }, 5);
            expect(acc.n).to.eq(0);
        }, 5);
    });

    it("should forward arguments", (done) => {
        class Class {
            @buffered.decorator(1)
            public fn(t: Date) {
                const dt = new Date().getTime() - t.getTime();
                expect(dt >= 0).to.eq(true); done();
            }
        }
        new Class().fn(new Date());
    });

    it("should return a promise", (done) => {
        class Class {
            @buffered.decorator(1)
            public async fn(t: Date) {
                return new Date().getTime() - t.getTime();
            }
        }
        const p = new Class().fn(new Date());
        expect(p).to.be.a("Promise");
        p.then((res: number) => {
            expect(res).to.be.a("number");
            expect(res >= 0).to.eq(true);
            throw new Error(res.toString());
        }).catch((err: Error) => {
            expect(err.name).to.eq("Error");
            expect(err.message).to.be.a("string");
            expect(err.message >= "0").to.eq(true);
        });
        setTimeout(done, 1);
    });

    it("should await a result", async () => {
        class Class {
            @buffered.decorator(1)
            public async fn(t: Date): Promise<number> {
                return new Date().getTime() - t.getTime();
            }
        }
        const dt = await new Class().fn(new Date());
        expect(dt).to.be.a("number");
        expect(dt >= 0).to.eq(true);
    });

    it("should return a cancelable function", () => {
        class Class {
            @buffered.decorator
            public fn() {
                expect(true).to.eq(false);
            }
        }
        expect((new Class().fn)).to.be.a("function");
        expect((new Class().fn as any).cancel).to.be.a("function");
    });

    it("should cancel invocations", () => {
        class Class {
            @buffered.decorator
            public fn() {
                expect(true).to.eq(false);
            }
        }
        const c = new Class();
        c.fn(); c.fn(); c.fn();
        (c.fn as any).cancel();
    });
});
