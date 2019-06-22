// @ts-ignore
import * as pkg from '../package.json';
import * as spawn from 'cross-spawn';

test('test fun version', () => {
    const res = spawn.sync('ts-node', ['src/cli/<%= bin %>.ts', '--version']);
    expect(res.stdout.toString().trim()).toBe(pkg.version);
});

test('test no command', () => {
    const res = spawn.sync('ts-node', ['src/cli/<%= bin %>.ts', 'no-command']);
    expect(res.stderr.toString()).toContain("unknown command 'no-command'");
});

test('test say hello', () => {
    const res = spawn.sync('ts-node', ['src/cli/<%= bin %>.ts', '-s', 'hello']);
    expect(res.stderr.toString()).toContain('hello');
});
