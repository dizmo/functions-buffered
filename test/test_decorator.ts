// tslint:disable:max-classes-per-file

import { expect } from "chai";
import { decorator } from "../lib/index";
import { IBufferedFunction } from "../lib/index";

import "mocha";

describe("index.decorator", () => {
    it("should exist", () => {
        expect(decorator).to.not.be.an("undefined");
    });
    it("should be a function", () => {
        expect(decorator).to.be.a("function");
    });
});

describe("index.decorator", () => {
    it("should return a buffered function", () => {
        class Class {
            @decorator
            public fn() {
                expect(true).to.eq(true);
            }
        }
        expect(new Class().fn).to.be.a("function");
    });

    it("should preserve `this` correctly", (done) => {
        class Class {
            @decorator(0)
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
            @decorator(0)
            public fn(this: any) {
                expect(this).to.be.an("object");
                expect(this.key).to.eq(true);
                done();
            }
        }
        new Class().fn.bind({key: true})();
    });

    it("should buffer invocations", (done) => {
        class Class {
            public n = 0;
            @decorator(5)
            public fn() {
                this.n += 1;
            }
        }

        const c = new Class();
        expect(c.n).to.eq(0);
        expect(c.fn).to.be.a("function");

        const id = setInterval(() => {
            expect(c.n).to.eq(0);
            c.fn(); c.fn(); c.fn();
            expect(c.n).to.eq(0);
        }, 1);

        setTimeout(() => {
            expect(c.n).to.eq(0);
            clearInterval(id);
            expect(c.n).to.eq(0);

            setTimeout(() => {
                expect(c.n).to.eq(0);
            }, 1);
            expect(c.n).to.eq(0);

            setTimeout(() => {
                expect(c.n).to.eq(1); done();
            }, 5);
            expect(c.n).to.eq(0);
        }, 5);
    });

    it("should forward arguments", (done) => {
        class Class {
            @decorator(1)
            public fn(t: Date) {
                expect(new Date().getTime() - t.getTime() >= 0).to.eq(true);
                done();
            }
        }
        new Class().fn(new Date());
    });

    it("should return a promise", (done) => {
        class Class {
            @decorator(1)
            public fn(t: Date): number {
                return new Date().getTime() - t.getTime();
            }
        }
        const p: Promise<number> = new Class().fn(new Date()) as any;
        expect(p).to.be.a("Promise");
        p.then((res: number) => {
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
            @decorator(1)
            public fn(t: Date): number {
                return new Date().getTime() - t.getTime();
            }
        }
        const dt = await new Class().fn(new Date());
        expect(dt).to.be.a("number");
        expect(dt >= 0).to.eq(true);
    });

    it("should return a cancelable function", () => {
        class Class {
            @decorator
            public fn() {
                expect(true).to.eq(true);
            }
        }
        expect((new Class().fn)).to.be.a("function");
        expect((new Class().fn as any).cancel).to.be.a("function");
    });

    it("should cancel invocations", () => {
        class Class {
            @decorator(1)
            public fn() {
                expect(true).to.eq(false);
            }
        }
        const c = new Class();
        c.fn(); c.fn(); c.fn();
        (c.fn as any).cancel();
    });
});
