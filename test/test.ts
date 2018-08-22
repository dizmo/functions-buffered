import { expect } from "chai";
import { buffered } from "../lib";

import "mocha";

describe("buffered", () => {
    it("should exist", () => {
        expect(buffered).to.not.be.an("undefined");
    });
    it("should be a function", () => {
        expect(buffered).to.be.a("function");
    });
});

describe("buffered", () => {
    it("should return a buffered function", () => {
        const fn = buffered(() => {
            expect(true).to.eq(true);
        });
        expect(fn).to.be.a("function");
    });

    it("should preserve `this` correctly", (done) => {
        buffered(function(this: any) {
            expect(this).to.be.an("undefined");
        }, 1)();

        buffered(function(this: any) {
            expect(this).to.be.an("object");
            expect(this.key).to.eq(true);
        }.bind({key: true}), 1)();

        setTimeout(done, 1);
    });

    it("should buffer invocations", (done) => {
        let n = 0;
        const fn = buffered(() => {
            n += 1;
        }, 5);

        expect(n).to.eq(0);
        expect(fn).to.be.a("function");

        const id = setInterval(() => {
            expect(n).to.eq(0);
            fn(); fn(); fn();
            expect(n).to.eq(0);
        }, 1);

        setTimeout(() => {
            expect(n).to.eq(0);
            clearInterval(id);
            expect(n).to.eq(0);

            setTimeout(() => {
                expect(n).to.eq(0);
            }, 1);
            expect(n).to.eq(0);

            setTimeout(() => {
                expect(n).to.eq(1); done();
            }, 5);
            expect(n).to.eq(0);
        }, 5);
    });

    it("should forward arguments", (done) => {
        buffered((t: Date) => {
            const dt = new Date().getTime() - t.getTime();
            expect(dt >= 0).to.eq(true); done();
        }, 1)(new Date());
    });

    it("should return a promise", (done) => {
        const fn = buffered((t: number) => {
            return new Date().getTime() - t;
        }, 1);
        const p = fn(new Date().getTime());
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
        const fn = buffered((t: number) => {
            return new Date() as any - t;
        }, 1);

        const dt = await fn(new Date());
        expect(dt).to.be.a("number");
        expect(dt >= 0).to.eq(true);
    });

    it("should return a cancelable function", () => {
        const fn = buffered(() => {
            expect(true).to.eq(true);
        });
        expect(fn).to.be.a("function");
        expect(fn.cancel).to.be.a("function");
    });

    it("should cancel invocations", () => {
        const fn = buffered(() => {
            expect(true).to.eq(false);
        }, 1);
        fn(); fn(); fn(); fn.cancel();
    });
});
