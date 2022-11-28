const {generateMbi, validateMbiFormat} = require("./mbi-utils");

test('check specific validation cases', () => {
    // First number can't be a zero
    expect(validateMbiFormat('0MF4PE4MN15')).toBe(false);

    // But other numeric positions can be 0-9
    expect(validateMbiFormat('1MF0PE0MN00')).toBe(true);

    // Allow lower-case in validator
    expect(validateMbiFormat('1mf4pe4mn15')).toBe(true);

    // Ensure invalid chars don't pass: S, L, O, I, B, Z
    expect(validateMbiFormat('1SF0PE0MN00')).toBe(false);
    expect(validateMbiFormat('1ML0PE0MN00')).toBe(false);
    expect(validateMbiFormat('1MF0OE0MN00')).toBe(false);
    expect(validateMbiFormat('1MF0PI0MN00')).toBe(false);
    expect(validateMbiFormat('1MF0PE0BN00')).toBe(false);
    expect(validateMbiFormat('1MF0PE0MZ00')).toBe(false);

    // Ensure short string fails
    expect(validateMbiFormat('1MF4PE4MN1')).toBe(false);

    // Ensure short string fails
    expect(validateMbiFormat('1MF4PE4MN153')).toBe(false);

    // Allow formatting dashes in MBI
    expect(validateMbiFormat('1MF0-PE0-MN00')).toBe(true);

    // don't allow numbers in alpha-only spots
    expect(validateMbiFormat('10F4PE4MN15')).toBe(false);
    expect(validateMbiFormat('1MF40E4MN15')).toBe(false);
    expect(validateMbiFormat('1MF4PE40N15')).toBe(false);
    expect(validateMbiFormat('1MF4PE4M015')).toBe(false);

    // don't allow alphabetic chars in number spots
    expect(validateMbiFormat('AMF4PE4MN10')).toBe(false);
    expect(validateMbiFormat('1MFAPE4MN10')).toBe(false);
    expect(validateMbiFormat('1MF4PEAMN10')).toBe(false);
    expect(validateMbiFormat('1MF4PE4MNA0')).toBe(false);
    expect(validateMbiFormat('1MF4PE4MN1A')).toBe(false);
});

test('check generated mbi with own validator 100 times', () => {
    for (let i = 0; i < 100; i++) {
        expect(validateMbiFormat(generateMbi())).toBe(true);
    }
});

test('check generated length', () => {
    expect(generateMbi().length).toBe(11);
});

