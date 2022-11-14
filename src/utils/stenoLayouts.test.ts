import {
  mapBriefToJapaneseStenoKeys,
} from './stenoLayouts';

describe('map Japanese stroke to Japanese keys', () => {
  // let japaneseOrder = '漢「4たな3かさ2いう1おっ*4たな3かさ2いう1おっ」カ';
  it('show no keys for empty brief', () => {
    let brief = "";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: false,
      theLeftKagikakko: false,
      theLeft4: false,
      theLeftた: false,
      theLeftな: false,
      theLeft3: false,
      theLeftか: false,
      theLeftさ: false,
      theLeft2: false,
      theLeftい: false,
      theLeftう: false,
      theLeft1: false,
      theLeftお: false,
      theLeftっ: false,
      theStar: false,
      dash: false,
      theRight4: false,
      theRightた: false,
      theRightな: false,
      theRight3: false,
      theRightか: false,
      theRightさ: false,
      theRight2: false,
      theRightい: false,
      theRightう: false,
      theRight1: false,
      theRightお: false,
      theRightっ: false,
      theRightKagikakko: false,
      theカ: false
    });
  });

  it('show nothing when given non-steno letters', () => {
    let brief = "⌘";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: false,
      theLeftKagikakko: false,
      theLeft4: false,
      theLeftた: false,
      theLeftな: false,
      theLeft3: false,
      theLeftか: false,
      theLeftさ: false,
      theLeft2: false,
      theLeftい: false,
      theLeftう: false,
      theLeft1: false,
      theLeftお: false,
      theLeftっ: false,
      theStar: false,
      dash: false,
      theRight4: false,
      theRightた: false,
      theRightな: false,
      theRight3: false,
      theRightか: false,
      theRightさ: false,
      theRight2: false,
      theRightい: false,
      theRightう: false,
      theRight1: false,
      theRightお: false,
      theRightっ: false,
      theRightKagikakko: false,
      theカ: false
    });
  });

  it('shows punctuation brief for 。', () => {
    let brief = "「か-か」";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: false,
      theLeftKagikakko: true,
      theLeft4: false,
      theLeftた: false,
      theLeftな: false,
      theLeft3: false,
      theLeftか: true,
      theLeftさ: false,
      theLeft2: false,
      theLeftい: false,
      theLeftう: false,
      theLeft1: false,
      theLeftお: false,
      theLeftっ: false,
      theStar: false,
      dash: true,
      theRight4: false,
      theRightた: false,
      theRightな: false,
      theRight3: false,
      theRightか: true,
      theRightさ: false,
      theRight2: false,
      theRightい: false,
      theRightう: false,
      theRight1: false,
      theRightお: false,
      theRightっ: false,
      theRightKagikakko: true,
      theカ: false
    });
  });

  it('shows punctuation brief for ？', () => {
    let brief = "「-たかいお」";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: false,
      theLeftKagikakko: true,
      theLeft4: false,
      theLeftた: false,
      theLeftな: false,
      theLeft3: false,
      theLeftか: false,
      theLeftさ: false,
      theLeft2: false,
      theLeftい: false,
      theLeftう: false,
      theLeft1: false,
      theLeftお: false,
      theLeftっ: false,
      theStar: false,
      dash: true,
      theRight4: false,
      theRightた: true,
      theRightな: false,
      theRight3: false,
      theRightか: true,
      theRightさ: false,
      theRight2: false,
      theRightい: true,
      theRightう: false,
      theRight1: false,
      theRightお: true,
      theRightっ: false,
      theRightKagikakko: true,
      theカ: false
    });
  });

  it('shows brief for number 50', () => {
    let brief = "41-4321";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: false,
      theLeftKagikakko: false,
      theLeft4: true,
      theLeftた: false,
      theLeftな: false,
      theLeft3: false,
      theLeftか: false,
      theLeftさ: false,
      theLeft2: false,
      theLeftい: false,
      theLeftう: false,
      theLeft1: true,
      theLeftお: false,
      theLeftっ: false,
      theStar: false,
      dash: true,
      theRight4: true,
      theRightた: false,
      theRightな: false,
      theRight3: true,
      theRightか: false,
      theRightさ: false,
      theRight2: true,
      theRightい: false,
      theRightう: false,
      theRight1: true,
      theRightお: false,
      theRightっ: false,
      theRightKagikakko: false,
      theカ: false
    });
  });

  it('shows brief for number 89', () => {
    let brief = "431-432";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: false,
      theLeftKagikakko: false,
      theLeft4: true,
      theLeftた: false,
      theLeftな: false,
      theLeft3: true,
      theLeftか: false,
      theLeftさ: false,
      theLeft2: false,
      theLeftい: false,
      theLeftう: false,
      theLeft1: true,
      theLeftお: false,
      theLeftっ: false,
      theStar: false,
      dash: true,
      theRight4: true,
      theRightた: false,
      theRightな: false,
      theRight3: true,
      theRightか: false,
      theRightさ: false,
      theRight2: true,
      theRightい: false,
      theRightう: false,
      theRight1: false,
      theRightお: false,
      theRightっ: false,
      theRightKagikakko: false,
      theカ: false
    });
  });

  it('shows brief for ambiguous kanji with dash 刊', () => {
    let brief = "漢432っ-た32おっ";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: true,
      theLeftKagikakko: false,
      theLeft4: true,
      theLeftた: false,
      theLeftな: false,
      theLeft3: true,
      theLeftか: false,
      theLeftさ: false,
      theLeft2: true,
      theLeftい: false,
      theLeftう: false,
      theLeft1: false,
      theLeftお: false,
      theLeftっ: true,
      theStar: false,
      dash: true,
      theRight4: false,
      theRightた: true,
      theRightな: false,
      theRight3: true,
      theRightか: false,
      theRightさ: false,
      theRight2: true,
      theRightい: false,
      theRightう: false,
      theRight1: false,
      theRightお: true,
      theRightっ: true,
      theRightKagikakko: false,
      theカ: false
    });
  });

  it('shows brief for ambiguous kanji with star 刑', () => {
    let brief = "漢432っ*た32おっ";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: true,
      theLeftKagikakko: false,
      theLeft4: true,
      theLeftた: false,
      theLeftな: false,
      theLeft3: true,
      theLeftか: false,
      theLeftさ: false,
      theLeft2: true,
      theLeftい: false,
      theLeftう: false,
      theLeft1: false,
      theLeftお: false,
      theLeftっ: true,
      theStar: true,
      dash: false,
      theRight4: false,
      theRightた: true,
      theRightな: false,
      theRight3: true,
      theRightか: false,
      theRightさ: false,
      theRight2: true,
      theRightい: false,
      theRightう: false,
      theRight1: false,
      theRightお: true,
      theRightっ: true,
      theRightKagikakko: false,
      theカ: false
    });
  });

  it('shows brief for first stroke of multi-stroke word 食べる', () => {
    let brief = "漢たさうおっ";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: true,
      theLeftKagikakko: false,
      theLeft4: false,
      theLeftた: true,
      theLeftな: false,
      theLeft3: false,
      theLeftか: false,
      theLeftさ: true,
      theLeft2: false,
      theLeftい: false,
      theLeftう: true,
      theLeft1: false,
      theLeftお: true,
      theLeftっ: true,
      theStar: false,
      dash: false,
      theRight4: false,
      theRightた: false,
      theRightな: false,
      theRight3: false,
      theRightか: false,
      theRightさ: false,
      theRight2: false,
      theRightい: false,
      theRightう: false,
      theRight1: false,
      theRightお: false,
      theRightっ: false,
      theRightKagikakko: false,
      theカ: false
    });
  });

  it('shows brief for second stroke of multi-stroke word 食べる', () => {
    let brief = "たなさいうお-たなう";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: false,
      theLeftKagikakko: false,
      theLeft4: false,
      theLeftた: true,
      theLeftな: true,
      theLeft3: false,
      theLeftか: false,
      theLeftさ: true,
      theLeft2: false,
      theLeftい: true,
      theLeftう: true,
      theLeft1: false,
      theLeftお: true,
      theLeftっ: false,
      theStar: false,
      dash: true,
      theRight4: false,
      theRightた: true,
      theRightな: true,
      theRight3: false,
      theRightか: false,
      theRightさ: false,
      theRight2: false,
      theRightい: false,
      theRightう: true,
      theRight1: false,
      theRightお: false,
      theRightっ: false,
      theRightKagikakko: false,
      theカ: false
    });
  });

  it('shows brief with left keys for だ', () => {
    let brief = "たなか";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: false,
      theLeftKagikakko: false,
      theLeft4: false,
      theLeftた: true,
      theLeftな: true,
      theLeft3: false,
      theLeftか: true,
      theLeftさ: false,
      theLeft2: false,
      theLeftい: false,
      theLeftう: false,
      theLeft1: false,
      theLeftお: false,
      theLeftっ: false,
      theStar: false,
      dash: false,
      theRight4: false,
      theRightた: false,
      theRightな: false,
      theRight3: false,
      theRightか: false,
      theRightさ: false,
      theRight2: false,
      theRightい: false,
      theRightう: false,
      theRight1: false,
      theRightお: false,
      theRightっ: false,
      theRightKagikakko: false,
      theカ: false
    });
  });

  it('shows brief with right keys for だ', () => {
    let brief = "-たなか";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: false,
      theLeftKagikakko: false,
      theLeft4: false,
      theLeftた: false,
      theLeftな: false,
      theLeft3: false,
      theLeftか: false,
      theLeftさ: false,
      theLeft2: false,
      theLeftい: false,
      theLeftう: false,
      theLeft1: false,
      theLeftお: false,
      theLeftっ: false,
      theStar: false,
      dash: true,
      theRight4: false,
      theRightた: true,
      theRightな: true,
      theRight3: false,
      theRightか: true,
      theRightさ: false,
      theRight2: false,
      theRightい: false,
      theRightう: false,
      theRight1: false,
      theRightお: false,
      theRightっ: false,
      theRightKagikakko: false,
      theカ: false
    });
  });

  it('shows brief with left and right keys for です', () => {
    let brief = "たなかいうお-さう";
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: false,
      theLeftKagikakko: false,
      theLeft4: false,
      theLeftた: true,
      theLeftな: true,
      theLeft3: false,
      theLeftか: true,
      theLeftさ: false,
      theLeft2: false,
      theLeftい: true,
      theLeftう: true,
      theLeft1: false,
      theLeftお: true,
      theLeftっ: false,
      theStar: false,
      dash: true,
      theRight4: false,
      theRightた: false,
      theRightな: false,
      theRight3: false,
      theRightか: false,
      theRightさ: true,
      theRight2: false,
      theRightい: false,
      theRightう: true,
      theRight1: false,
      theRightお: false,
      theRightっ: false,
      theRightKagikakko: false,
      theカ: false
    });
  });

  it('shows all keys for full steno order ignoring dash', () => {
    let brief = '漢「4たな3かさ2いう1おっ*4たな3かさ2いう1おっ」カ';
    expect(mapBriefToJapaneseStenoKeys(brief)).toEqual({
      the漢: true,
      theLeftKagikakko: true,
      theLeft4: true,
      theLeftた: true,
      theLeftな: true,
      theLeft3: true,
      theLeftか: true,
      theLeftさ: true,
      theLeft2: true,
      theLeftい: true,
      theLeftう: true,
      theLeft1: true,
      theLeftお: true,
      theLeftっ: true,
      theStar: true,
      dash: false,
      theRight4: true,
      theRightた: true,
      theRightな: true,
      theRight3: true,
      theRightか: true,
      theRightさ: true,
      theRight2: true,
      theRightい: true,
      theRightう: true,
      theRight1: true,
      theRightお: true,
      theRightっ: true,
      theRightKagikakko: true,
      theカ: true
    });
  });
});

