import ImageModel from '../../models/image';
import errors from '../../utils/errorFinder';

describe('Test error handling', () => {
    it('return empty array for good request', () => {
        expect(errors(new ImageModel('fjord', 300, 300))).toEqual([]);
    });
    it('return array with 1 entry for bad request with 1 wrong attribute', () => {
        expect(errors(new ImageModel('', 300, 300)).length).toEqual(1);
    });
    it('return array with 3 entry for bad request with 3 wrong attribute', () => {
        expect(errors(new ImageModel('fdgfdg', -1, -2)).length).toEqual(3);
    });
});
