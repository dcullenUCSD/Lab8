/**
 * @jest-environment jsdom
 */

import { expect } from '@jest/globals';
import { pushToHistory } from '../scripts/router.js';

describe ('pushToHistroy', () => {
    test('settings', () => {
        expect(pushToHistory('settings', 0).state).toStrictEqual({page : 'settings'});
    });

    test('entry', () => {
        expect(pushToHistory('entry', 3).state).toStrictEqual({page : 'entry3'});
    });

    test('default', () => {
        expect(pushToHistory('something', 16).state).toStrictEqual({});
    });
});

