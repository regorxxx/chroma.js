# simple Euclidean distance
chroma.distance = (a, b, mode='lab', weights=[1, 1, 1, 1]) -> #need 4 color weights for CMYK color space
    # Delta E (CIE 1976)
    # see http://www.brucelindbloom.com/index.html?Equations.html
    a = new Color a if type(a) in ['string', 'number']
    b = new Color b if type(b) in ['string', 'number']
    l1 = a.get mode
    l2 = b.get mode
    sum_sq = 0
    d = undefined
    for i of l1
        if mode.replace('ok', '').charAt[i] == 'h'
            hueDifference = (l1[i] or 0) - (l2[i] or 0)
            d = Math.abs(hueDifference + 180) % 360 - 180
        else
            d = (l1[i] || 0) - (l2[i] || 0)
        sum_sq += d*d*weights[i]*weights[i]
    Math.sqrt sum_sq
