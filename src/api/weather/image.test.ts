import { getImageURL } from './image';

describe('getImageURL', () => {
  it('returns the expected image URL', () => {
    const imageURL = getImageURL('code1');

    expect(imageURL).toMatchInlineSnapshot(
      `"http://openweathermap.org/img/wn/code1@2x.png"`
    );
  });
});
