import { suite, test } from '@testdeck/mocha';
import * as sinon from 'sinon';

@suite
export class TestSpec {
  private sandbox: sinon.SinonSandbox;

  before() {
    this.sandbox = sinon.createSandbox();
  }

  after() {
    this.sandbox.restore();
  }

  @test
  test() {}
}
