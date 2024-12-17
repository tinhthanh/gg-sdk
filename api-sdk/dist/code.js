function sendmail() {}
function doPost() {}
function doGet() {}
function getGmailLabels() {}
function getGmailAliases() {}
function createSixMinuteSchedule() {}
function runJob() {}
function createTriggerRunSendSms() {}
function jobSendSms() {}
function syncBookingJob() {}
function syncWaitingTimeJob() {}
function jobSyncProductKiotViet() {}
(() => {
  var a = {
      452: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          i(269),
          i(214),
          i(888),
          i(109),
          (function () {
            var a = o,
              r = a.lib.BlockCipher,
              i = a.algo,
              s = [],
              l = [],
              d = [],
              c = [],
              p = [],
              g = [],
              h = [],
              u = [],
              f = [],
              b = [];
            !(function () {
              for (var a = [], r = 0; r < 256; r++)
                a[r] = r < 128 ? r << 1 : (r << 1) ^ 283;
              var i = 0,
                o = 0;
              for (r = 0; r < 256; r++) {
                var m = o ^ (o << 1) ^ (o << 2) ^ (o << 3) ^ (o << 4);
                (m = (m >>> 8) ^ (255 & m) ^ 99), (s[i] = m), (l[m] = i);
                var y = a[i],
                  w = a[y],
                  v = a[w],
                  x = (257 * a[m]) ^ (16843008 * m);
                (d[i] = (x << 24) | (x >>> 8)),
                  (c[i] = (x << 16) | (x >>> 16)),
                  (p[i] = (x << 8) | (x >>> 24)),
                  (g[i] = x),
                  (x =
                    (16843009 * v) ^ (65537 * w) ^ (257 * y) ^ (16843008 * i)),
                  (h[m] = (x << 24) | (x >>> 8)),
                  (u[m] = (x << 16) | (x >>> 16)),
                  (f[m] = (x << 8) | (x >>> 24)),
                  (b[m] = x),
                  i ? ((i = y ^ a[a[a[v ^ y]]]), (o ^= a[a[o]])) : (i = o = 1);
              }
            })();
            var m = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
              y = (i.AES = r.extend({
                _doReset: function () {
                  if (!this._nRounds || this._keyPriorReset !== this._key) {
                    for (
                      var a = (this._keyPriorReset = this._key),
                        r = a.words,
                        i = a.sigBytes / 4,
                        o = 4 * ((this._nRounds = i + 6) + 1),
                        l = (this._keySchedule = []),
                        d = 0;
                      d < o;
                      d++
                    )
                      d < i
                        ? (l[d] = r[d])
                        : ((g = l[d - 1]),
                          d % i
                            ? i > 6 &&
                              d % i == 4 &&
                              (g =
                                (s[g >>> 24] << 24) |
                                (s[(g >>> 16) & 255] << 16) |
                                (s[(g >>> 8) & 255] << 8) |
                                s[255 & g])
                            : ((g =
                                (s[(g = (g << 8) | (g >>> 24)) >>> 24] << 24) |
                                (s[(g >>> 16) & 255] << 16) |
                                (s[(g >>> 8) & 255] << 8) |
                                s[255 & g]),
                              (g ^= m[(d / i) | 0] << 24)),
                          (l[d] = l[d - i] ^ g));
                    for (
                      var c = (this._invKeySchedule = []), p = 0;
                      p < o;
                      p++
                    ) {
                      if (((d = o - p), p % 4)) var g = l[d];
                      else g = l[d - 4];
                      c[p] =
                        p < 4 || d <= 4
                          ? g
                          : h[s[g >>> 24]] ^
                            u[s[(g >>> 16) & 255]] ^
                            f[s[(g >>> 8) & 255]] ^
                            b[s[255 & g]];
                    }
                  }
                },
                encryptBlock: function (a, r) {
                  this._doCryptBlock(a, r, this._keySchedule, d, c, p, g, s);
                },
                decryptBlock: function (a, r) {
                  var i = a[r + 1];
                  (a[r + 1] = a[r + 3]),
                    (a[r + 3] = i),
                    this._doCryptBlock(
                      a,
                      r,
                      this._invKeySchedule,
                      h,
                      u,
                      f,
                      b,
                      l
                    ),
                    (i = a[r + 1]),
                    (a[r + 1] = a[r + 3]),
                    (a[r + 3] = i);
                },
                _doCryptBlock: function (a, r, i, o, s, l, d, c) {
                  for (
                    var p = this._nRounds,
                      g = a[r] ^ i[0],
                      h = a[r + 1] ^ i[1],
                      u = a[r + 2] ^ i[2],
                      f = a[r + 3] ^ i[3],
                      b = 4,
                      m = 1;
                    m < p;
                    m++
                  ) {
                    var y =
                        o[g >>> 24] ^
                        s[(h >>> 16) & 255] ^
                        l[(u >>> 8) & 255] ^
                        d[255 & f] ^
                        i[b++],
                      w =
                        o[h >>> 24] ^
                        s[(u >>> 16) & 255] ^
                        l[(f >>> 8) & 255] ^
                        d[255 & g] ^
                        i[b++],
                      v =
                        o[u >>> 24] ^
                        s[(f >>> 16) & 255] ^
                        l[(g >>> 8) & 255] ^
                        d[255 & h] ^
                        i[b++],
                      x =
                        o[f >>> 24] ^
                        s[(g >>> 16) & 255] ^
                        l[(h >>> 8) & 255] ^
                        d[255 & u] ^
                        i[b++];
                    (g = y), (h = w), (u = v), (f = x);
                  }
                  (y =
                    ((c[g >>> 24] << 24) |
                      (c[(h >>> 16) & 255] << 16) |
                      (c[(u >>> 8) & 255] << 8) |
                      c[255 & f]) ^
                    i[b++]),
                    (w =
                      ((c[h >>> 24] << 24) |
                        (c[(u >>> 16) & 255] << 16) |
                        (c[(f >>> 8) & 255] << 8) |
                        c[255 & g]) ^
                      i[b++]),
                    (v =
                      ((c[u >>> 24] << 24) |
                        (c[(f >>> 16) & 255] << 16) |
                        (c[(g >>> 8) & 255] << 8) |
                        c[255 & h]) ^
                      i[b++]),
                    (x =
                      ((c[f >>> 24] << 24) |
                        (c[(g >>> 16) & 255] << 16) |
                        (c[(h >>> 8) & 255] << 8) |
                        c[255 & u]) ^
                      i[b++]),
                    (a[r] = y),
                    (a[r + 1] = w),
                    (a[r + 2] = v),
                    (a[r + 3] = x);
                },
                keySize: 8,
              }));
            a.AES = r._createHelper(y);
          })(),
          o.AES);
      },
      109: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          i(888),
          void (
            o.lib.Cipher ||
            (function (a) {
              var r = o,
                i = r.lib,
                s = i.Base,
                l = i.WordArray,
                d = i.BufferedBlockAlgorithm,
                c = r.enc,
                p = (c.Utf8, c.Base64),
                g = r.algo.EvpKDF,
                h = (i.Cipher = d.extend({
                  cfg: s.extend(),
                  createEncryptor: function (a, r) {
                    return this.create(this._ENC_XFORM_MODE, a, r);
                  },
                  createDecryptor: function (a, r) {
                    return this.create(this._DEC_XFORM_MODE, a, r);
                  },
                  init: function (a, r, i) {
                    (this.cfg = this.cfg.extend(i)),
                      (this._xformMode = a),
                      (this._key = r),
                      this.reset();
                  },
                  reset: function () {
                    d.reset.call(this), this._doReset();
                  },
                  process: function (a) {
                    return this._append(a), this._process();
                  },
                  finalize: function (a) {
                    return a && this._append(a), this._doFinalize();
                  },
                  keySize: 4,
                  ivSize: 4,
                  _ENC_XFORM_MODE: 1,
                  _DEC_XFORM_MODE: 2,
                  _createHelper: (function () {
                    function selectCipherStrategy(a) {
                      return "string" == typeof a ? _ : v;
                    }
                    return function (a) {
                      return {
                        encrypt: function (r, i, o) {
                          return selectCipherStrategy(i).encrypt(a, r, i, o);
                        },
                        decrypt: function (r, i, o) {
                          return selectCipherStrategy(i).decrypt(a, r, i, o);
                        },
                      };
                    };
                  })(),
                })),
                u =
                  ((i.StreamCipher = h.extend({
                    _doFinalize: function () {
                      return this._process(!0);
                    },
                    blockSize: 1,
                  })),
                  (r.mode = {})),
                f = (i.BlockCipherMode = s.extend({
                  createEncryptor: function (a, r) {
                    return this.Encryptor.create(a, r);
                  },
                  createDecryptor: function (a, r) {
                    return this.Decryptor.create(a, r);
                  },
                  init: function (a, r) {
                    (this._cipher = a), (this._iv = r);
                  },
                })),
                b = (u.CBC = (function () {
                  var r = f.extend();
                  function xorBlock(r, i, o) {
                    var s,
                      l = this._iv;
                    l ? ((s = l), (this._iv = a)) : (s = this._prevBlock);
                    for (var d = 0; d < o; d++) r[i + d] ^= s[d];
                  }
                  return (
                    (r.Encryptor = r.extend({
                      processBlock: function (a, r) {
                        var i = this._cipher,
                          o = i.blockSize;
                        xorBlock.call(this, a, r, o),
                          i.encryptBlock(a, r),
                          (this._prevBlock = a.slice(r, r + o));
                      },
                    })),
                    (r.Decryptor = r.extend({
                      processBlock: function (a, r) {
                        var i = this._cipher,
                          o = i.blockSize,
                          s = a.slice(r, r + o);
                        i.decryptBlock(a, r),
                          xorBlock.call(this, a, r, o),
                          (this._prevBlock = s);
                      },
                    })),
                    r
                  );
                })()),
                m = ((r.pad = {}).Pkcs7 = {
                  pad: function (a, r) {
                    for (
                      var i = 4 * r,
                        o = i - (a.sigBytes % i),
                        s = (o << 24) | (o << 16) | (o << 8) | o,
                        d = [],
                        c = 0;
                      c < o;
                      c += 4
                    )
                      d.push(s);
                    var p = l.create(d, o);
                    a.concat(p);
                  },
                  unpad: function (a) {
                    var r = 255 & a.words[(a.sigBytes - 1) >>> 2];
                    a.sigBytes -= r;
                  },
                }),
                y =
                  ((i.BlockCipher = h.extend({
                    cfg: h.cfg.extend({ mode: b, padding: m }),
                    reset: function () {
                      var a;
                      h.reset.call(this);
                      var r = this.cfg,
                        i = r.iv,
                        o = r.mode;
                      this._xformMode == this._ENC_XFORM_MODE
                        ? (a = o.createEncryptor)
                        : ((a = o.createDecryptor), (this._minBufferSize = 1)),
                        this._mode && this._mode.__creator == a
                          ? this._mode.init(this, i && i.words)
                          : ((this._mode = a.call(o, this, i && i.words)),
                            (this._mode.__creator = a));
                    },
                    _doProcessBlock: function (a, r) {
                      this._mode.processBlock(a, r);
                    },
                    _doFinalize: function () {
                      var a,
                        r = this.cfg.padding;
                      return (
                        this._xformMode == this._ENC_XFORM_MODE
                          ? (r.pad(this._data, this.blockSize),
                            (a = this._process(!0)))
                          : ((a = this._process(!0)), r.unpad(a)),
                        a
                      );
                    },
                    blockSize: 4,
                  })),
                  (i.CipherParams = s.extend({
                    init: function (a) {
                      this.mixIn(a);
                    },
                    toString: function (a) {
                      return (a || this.formatter).stringify(this);
                    },
                  }))),
                w = ((r.format = {}).OpenSSL = {
                  stringify: function (a) {
                    var r = a.ciphertext,
                      i = a.salt;
                    return (
                      i
                        ? l.create([1398893684, 1701076831]).concat(i).concat(r)
                        : r
                    ).toString(p);
                  },
                  parse: function (a) {
                    var r,
                      i = p.parse(a),
                      o = i.words;
                    return (
                      1398893684 == o[0] &&
                        1701076831 == o[1] &&
                        ((r = l.create(o.slice(2, 4))),
                        o.splice(0, 4),
                        (i.sigBytes -= 16)),
                      y.create({ ciphertext: i, salt: r })
                    );
                  },
                }),
                v = (i.SerializableCipher = s.extend({
                  cfg: s.extend({ format: w }),
                  encrypt: function (a, r, i, o) {
                    o = this.cfg.extend(o);
                    var s = a.createEncryptor(i, o),
                      l = s.finalize(r),
                      d = s.cfg;
                    return y.create({
                      ciphertext: l,
                      key: i,
                      iv: d.iv,
                      algorithm: a,
                      mode: d.mode,
                      padding: d.padding,
                      blockSize: a.blockSize,
                      formatter: o.format,
                    });
                  },
                  decrypt: function (a, r, i, o) {
                    return (
                      (o = this.cfg.extend(o)),
                      (r = this._parse(r, o.format)),
                      a.createDecryptor(i, o).finalize(r.ciphertext)
                    );
                  },
                  _parse: function (a, r) {
                    return "string" == typeof a ? r.parse(a, this) : a;
                  },
                })),
                x = ((r.kdf = {}).OpenSSL = {
                  execute: function (a, r, i, o) {
                    o || (o = l.random(8));
                    var s = g.create({ keySize: r + i }).compute(a, o),
                      d = l.create(s.words.slice(r), 4 * i);
                    return (
                      (s.sigBytes = 4 * r), y.create({ key: s, iv: d, salt: o })
                    );
                  },
                }),
                _ = (i.PasswordBasedCipher = v.extend({
                  cfg: v.cfg.extend({ kdf: x }),
                  encrypt: function (a, r, i, o) {
                    var s = (o = this.cfg.extend(o)).kdf.execute(
                      i,
                      a.keySize,
                      a.ivSize
                    );
                    o.iv = s.iv;
                    var l = v.encrypt.call(this, a, r, s.key, o);
                    return l.mixIn(s), l;
                  },
                  decrypt: function (a, r, i, o) {
                    (o = this.cfg.extend(o)), (r = this._parse(r, o.format));
                    var s = o.kdf.execute(i, a.keySize, a.ivSize, r.salt);
                    return (o.iv = s.iv), v.decrypt.call(this, a, r, s.key, o);
                  },
                }));
            })()
          ));
      },
      249: function (a, r, i) {
        var o;
        a.exports =
          ((o =
            o ||
            (function (a, r) {
              var o;
              if (
                ("undefined" != typeof window &&
                  window.crypto &&
                  (o = window.crypto),
                "undefined" != typeof self && self.crypto && (o = self.crypto),
                "undefined" != typeof globalThis &&
                  globalThis.crypto &&
                  (o = globalThis.crypto),
                !o &&
                  "undefined" != typeof window &&
                  window.msCrypto &&
                  (o = window.msCrypto),
                !o && void 0 !== i.g && i.g.crypto && (o = i.g.crypto),
                !o)
              )
                try {
                  o = i(480);
                } catch (a) {}
              var cryptoSecureRandomInt = function () {
                  if (o) {
                    if ("function" == typeof o.getRandomValues)
                      try {
                        return o.getRandomValues(new Uint32Array(1))[0];
                      } catch (a) {}
                    if ("function" == typeof o.randomBytes)
                      try {
                        return o.randomBytes(4).readInt32LE();
                      } catch (a) {}
                  }
                  throw new Error(
                    "Native crypto module could not be used to get secure random number."
                  );
                },
                s =
                  Object.create ||
                  (function () {
                    function F() {}
                    return function (a) {
                      var r;
                      return (
                        (F.prototype = a),
                        (r = new F()),
                        (F.prototype = null),
                        r
                      );
                    };
                  })(),
                l = {},
                d = (l.lib = {}),
                c = (d.Base = {
                  extend: function (a) {
                    var r = s(this);
                    return (
                      a && r.mixIn(a),
                      (r.hasOwnProperty("init") && this.init !== r.init) ||
                        (r.init = function () {
                          r.$super.init.apply(this, arguments);
                        }),
                      (r.init.prototype = r),
                      (r.$super = this),
                      r
                    );
                  },
                  create: function () {
                    var a = this.extend();
                    return a.init.apply(a, arguments), a;
                  },
                  init: function () {},
                  mixIn: function (a) {
                    for (var r in a) a.hasOwnProperty(r) && (this[r] = a[r]);
                    a.hasOwnProperty("toString") &&
                      (this.toString = a.toString);
                  },
                  clone: function () {
                    return this.init.prototype.extend(this);
                  },
                }),
                p = (d.WordArray = c.extend({
                  init: function (a, i) {
                    (a = this.words = a || []),
                      (this.sigBytes = i != r ? i : 4 * a.length);
                  },
                  toString: function (a) {
                    return (a || h).stringify(this);
                  },
                  concat: function (a) {
                    var r = this.words,
                      i = a.words,
                      o = this.sigBytes,
                      s = a.sigBytes;
                    if ((this.clamp(), o % 4))
                      for (var l = 0; l < s; l++) {
                        var d = (i[l >>> 2] >>> (24 - (l % 4) * 8)) & 255;
                        r[(o + l) >>> 2] |= d << (24 - ((o + l) % 4) * 8);
                      }
                    else
                      for (var c = 0; c < s; c += 4)
                        r[(o + c) >>> 2] = i[c >>> 2];
                    return (this.sigBytes += s), this;
                  },
                  clamp: function () {
                    var r = this.words,
                      i = this.sigBytes;
                    (r[i >>> 2] &= 4294967295 << (32 - (i % 4) * 8)),
                      (r.length = a.ceil(i / 4));
                  },
                  clone: function () {
                    var a = c.clone.call(this);
                    return (a.words = this.words.slice(0)), a;
                  },
                  random: function (a) {
                    for (var r = [], i = 0; i < a; i += 4)
                      r.push(cryptoSecureRandomInt());
                    return new p.init(r, a);
                  },
                })),
                g = (l.enc = {}),
                h = (g.Hex = {
                  stringify: function (a) {
                    for (
                      var r = a.words, i = a.sigBytes, o = [], s = 0;
                      s < i;
                      s++
                    ) {
                      var l = (r[s >>> 2] >>> (24 - (s % 4) * 8)) & 255;
                      o.push((l >>> 4).toString(16)),
                        o.push((15 & l).toString(16));
                    }
                    return o.join("");
                  },
                  parse: function (a) {
                    for (var r = a.length, i = [], o = 0; o < r; o += 2)
                      i[o >>> 3] |=
                        parseInt(a.substr(o, 2), 16) << (24 - (o % 8) * 4);
                    return new p.init(i, r / 2);
                  },
                }),
                u = (g.Latin1 = {
                  stringify: function (a) {
                    for (
                      var r = a.words, i = a.sigBytes, o = [], s = 0;
                      s < i;
                      s++
                    ) {
                      var l = (r[s >>> 2] >>> (24 - (s % 4) * 8)) & 255;
                      o.push(String.fromCharCode(l));
                    }
                    return o.join("");
                  },
                  parse: function (a) {
                    for (var r = a.length, i = [], o = 0; o < r; o++)
                      i[o >>> 2] |=
                        (255 & a.charCodeAt(o)) << (24 - (o % 4) * 8);
                    return new p.init(i, r);
                  },
                }),
                f = (g.Utf8 = {
                  stringify: function (a) {
                    try {
                      return decodeURIComponent(escape(u.stringify(a)));
                    } catch (a) {
                      throw new Error("Malformed UTF-8 data");
                    }
                  },
                  parse: function (a) {
                    return u.parse(unescape(encodeURIComponent(a)));
                  },
                }),
                b = (d.BufferedBlockAlgorithm = c.extend({
                  reset: function () {
                    (this._data = new p.init()), (this._nDataBytes = 0);
                  },
                  _append: function (a) {
                    "string" == typeof a && (a = f.parse(a)),
                      this._data.concat(a),
                      (this._nDataBytes += a.sigBytes);
                  },
                  _process: function (r) {
                    var i,
                      o = this._data,
                      s = o.words,
                      l = o.sigBytes,
                      d = this.blockSize,
                      c = l / (4 * d),
                      g =
                        (c = r
                          ? a.ceil(c)
                          : a.max((0 | c) - this._minBufferSize, 0)) * d,
                      h = a.min(4 * g, l);
                    if (g) {
                      for (var u = 0; u < g; u += d) this._doProcessBlock(s, u);
                      (i = s.splice(0, g)), (o.sigBytes -= h);
                    }
                    return new p.init(i, h);
                  },
                  clone: function () {
                    var a = c.clone.call(this);
                    return (a._data = this._data.clone()), a;
                  },
                  _minBufferSize: 0,
                })),
                m =
                  ((d.Hasher = b.extend({
                    cfg: c.extend(),
                    init: function (a) {
                      (this.cfg = this.cfg.extend(a)), this.reset();
                    },
                    reset: function () {
                      b.reset.call(this), this._doReset();
                    },
                    update: function (a) {
                      return this._append(a), this._process(), this;
                    },
                    finalize: function (a) {
                      return a && this._append(a), this._doFinalize();
                    },
                    blockSize: 16,
                    _createHelper: function (a) {
                      return function (r, i) {
                        return new a.init(i).finalize(r);
                      };
                    },
                    _createHmacHelper: function (a) {
                      return function (r, i) {
                        return new m.HMAC.init(a, i).finalize(r);
                      };
                    },
                  })),
                  (l.algo = {}));
              return l;
            })(Math)),
          o);
      },
      269: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          (function () {
            var a = o,
              r = a.lib.WordArray;
            function parseLoop(a, i, o) {
              for (var s = [], l = 0, d = 0; d < i; d++)
                if (d % 4) {
                  var c =
                    (o[a.charCodeAt(d - 1)] << ((d % 4) * 2)) |
                    (o[a.charCodeAt(d)] >>> (6 - (d % 4) * 2));
                  (s[l >>> 2] |= c << (24 - (l % 4) * 8)), l++;
                }
              return r.create(s, l);
            }
            a.enc.Base64 = {
              stringify: function (a) {
                var r = a.words,
                  i = a.sigBytes,
                  o = this._map;
                a.clamp();
                for (var s = [], l = 0; l < i; l += 3)
                  for (
                    var d =
                        (((r[l >>> 2] >>> (24 - (l % 4) * 8)) & 255) << 16) |
                        (((r[(l + 1) >>> 2] >>> (24 - ((l + 1) % 4) * 8)) &
                          255) <<
                          8) |
                        ((r[(l + 2) >>> 2] >>> (24 - ((l + 2) % 4) * 8)) & 255),
                      c = 0;
                    c < 4 && l + 0.75 * c < i;
                    c++
                  )
                    s.push(o.charAt((d >>> (6 * (3 - c))) & 63));
                var p = o.charAt(64);
                if (p) for (; s.length % 4; ) s.push(p);
                return s.join("");
              },
              parse: function (a) {
                var r = a.length,
                  i = this._map,
                  o = this._reverseMap;
                if (!o) {
                  o = this._reverseMap = [];
                  for (var s = 0; s < i.length; s++) o[i.charCodeAt(s)] = s;
                }
                var l = i.charAt(64);
                if (l) {
                  var d = a.indexOf(l);
                  -1 !== d && (r = d);
                }
                return parseLoop(a, r, o);
              },
              _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            };
          })(),
          o.enc.Base64);
      },
      786: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          (function () {
            var a = o,
              r = a.lib.WordArray;
            function parseLoop(a, i, o) {
              for (var s = [], l = 0, d = 0; d < i; d++)
                if (d % 4) {
                  var c =
                    (o[a.charCodeAt(d - 1)] << ((d % 4) * 2)) |
                    (o[a.charCodeAt(d)] >>> (6 - (d % 4) * 2));
                  (s[l >>> 2] |= c << (24 - (l % 4) * 8)), l++;
                }
              return r.create(s, l);
            }
            a.enc.Base64url = {
              stringify: function (a, r = !0) {
                var i = a.words,
                  o = a.sigBytes,
                  s = r ? this._safe_map : this._map;
                a.clamp();
                for (var l = [], d = 0; d < o; d += 3)
                  for (
                    var c =
                        (((i[d >>> 2] >>> (24 - (d % 4) * 8)) & 255) << 16) |
                        (((i[(d + 1) >>> 2] >>> (24 - ((d + 1) % 4) * 8)) &
                          255) <<
                          8) |
                        ((i[(d + 2) >>> 2] >>> (24 - ((d + 2) % 4) * 8)) & 255),
                      p = 0;
                    p < 4 && d + 0.75 * p < o;
                    p++
                  )
                    l.push(s.charAt((c >>> (6 * (3 - p))) & 63));
                var g = s.charAt(64);
                if (g) for (; l.length % 4; ) l.push(g);
                return l.join("");
              },
              parse: function (a, r = !0) {
                var i = a.length,
                  o = r ? this._safe_map : this._map,
                  s = this._reverseMap;
                if (!s) {
                  s = this._reverseMap = [];
                  for (var l = 0; l < o.length; l++) s[o.charCodeAt(l)] = l;
                }
                var d = o.charAt(64);
                if (d) {
                  var c = a.indexOf(d);
                  -1 !== c && (i = c);
                }
                return parseLoop(a, i, s);
              },
              _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
              _safe_map:
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
            };
          })(),
          o.enc.Base64url);
      },
      298: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          (function () {
            var a = o,
              r = a.lib.WordArray,
              i = a.enc;
            function swapEndian(a) {
              return ((a << 8) & 4278255360) | ((a >>> 8) & 16711935);
            }
            (i.Utf16 = i.Utf16BE =
              {
                stringify: function (a) {
                  for (
                    var r = a.words, i = a.sigBytes, o = [], s = 0;
                    s < i;
                    s += 2
                  ) {
                    var l = (r[s >>> 2] >>> (16 - (s % 4) * 8)) & 65535;
                    o.push(String.fromCharCode(l));
                  }
                  return o.join("");
                },
                parse: function (a) {
                  for (var i = a.length, o = [], s = 0; s < i; s++)
                    o[s >>> 1] |= a.charCodeAt(s) << (16 - (s % 2) * 16);
                  return r.create(o, 2 * i);
                },
              }),
              (i.Utf16LE = {
                stringify: function (a) {
                  for (
                    var r = a.words, i = a.sigBytes, o = [], s = 0;
                    s < i;
                    s += 2
                  ) {
                    var l = swapEndian(
                      (r[s >>> 2] >>> (16 - (s % 4) * 8)) & 65535
                    );
                    o.push(String.fromCharCode(l));
                  }
                  return o.join("");
                },
                parse: function (a) {
                  for (var i = a.length, o = [], s = 0; s < i; s++)
                    o[s >>> 1] |= swapEndian(
                      a.charCodeAt(s) << (16 - (s % 2) * 16)
                    );
                  return r.create(o, 2 * i);
                },
              });
          })(),
          o.enc.Utf16);
      },
      888: function (a, r, i) {
        var o, s, l, d, c, p, g, h;
        a.exports =
          ((h = i(249)),
          i(783),
          i(824),
          (s = (o = h).lib),
          (l = s.Base),
          (d = s.WordArray),
          (c = o.algo),
          (p = c.MD5),
          (g = c.EvpKDF =
            l.extend({
              cfg: l.extend({ keySize: 4, hasher: p, iterations: 1 }),
              init: function (a) {
                this.cfg = this.cfg.extend(a);
              },
              compute: function (a, r) {
                for (
                  var i,
                    o = this.cfg,
                    s = o.hasher.create(),
                    l = d.create(),
                    c = l.words,
                    p = o.keySize,
                    g = o.iterations;
                  c.length < p;

                ) {
                  i && s.update(i), (i = s.update(a).finalize(r)), s.reset();
                  for (var h = 1; h < g; h++) (i = s.finalize(i)), s.reset();
                  l.concat(i);
                }
                return (l.sigBytes = 4 * p), l;
              },
            })),
          (o.EvpKDF = function (a, r, i) {
            return g.create(i).compute(a, r);
          }),
          h.EvpKDF);
      },
      209: function (a, r, i) {
        var o, s, l, d;
        a.exports =
          ((d = i(249)),
          i(109),
          (s = (o = d).lib.CipherParams),
          (l = o.enc.Hex),
          (o.format.Hex = {
            stringify: function (a) {
              return a.ciphertext.toString(l);
            },
            parse: function (a) {
              var r = l.parse(a);
              return s.create({ ciphertext: r });
            },
          }),
          d.format.Hex);
      },
      824: function (a, r, i) {
        var o, s, l, d;
        a.exports =
          ((o = i(249)),
          (l = (s = o).lib.Base),
          (d = s.enc.Utf8),
          void (s.algo.HMAC = l.extend({
            init: function (a, r) {
              (a = this._hasher = new a.init()),
                "string" == typeof r && (r = d.parse(r));
              var i = a.blockSize,
                o = 4 * i;
              r.sigBytes > o && (r = a.finalize(r)), r.clamp();
              for (
                var s = (this._oKey = r.clone()),
                  l = (this._iKey = r.clone()),
                  c = s.words,
                  p = l.words,
                  g = 0;
                g < i;
                g++
              )
                (c[g] ^= 1549556828), (p[g] ^= 909522486);
              (s.sigBytes = l.sigBytes = o), this.reset();
            },
            reset: function () {
              var a = this._hasher;
              a.reset(), a.update(this._iKey);
            },
            update: function (a) {
              return this._hasher.update(a), this;
            },
            finalize: function (a) {
              var r = this._hasher,
                i = r.finalize(a);
              return r.reset(), r.finalize(this._oKey.clone().concat(i));
            },
          })));
      },
      354: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          i(938),
          i(433),
          i(298),
          i(269),
          i(786),
          i(214),
          i(783),
          i(153),
          i(792),
          i(34),
          i(460),
          i(327),
          i(706),
          i(824),
          i(112),
          i(888),
          i(109),
          i(568),
          i(242),
          i(968),
          i(660),
          i(148),
          i(615),
          i(807),
          i(77),
          i(475),
          i(991),
          i(209),
          i(452),
          i(253),
          i(857),
          i(454),
          i(974),
          o);
      },
      433: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          (function () {
            if ("function" == typeof ArrayBuffer) {
              var a = o.lib.WordArray,
                r = a.init,
                i = (a.init = function (a) {
                  if (
                    (a instanceof ArrayBuffer && (a = new Uint8Array(a)),
                    (a instanceof Int8Array ||
                      ("undefined" != typeof Uint8ClampedArray &&
                        a instanceof Uint8ClampedArray) ||
                      a instanceof Int16Array ||
                      a instanceof Uint16Array ||
                      a instanceof Int32Array ||
                      a instanceof Uint32Array ||
                      a instanceof Float32Array ||
                      a instanceof Float64Array) &&
                      (a = new Uint8Array(
                        a.buffer,
                        a.byteOffset,
                        a.byteLength
                      )),
                    a instanceof Uint8Array)
                  ) {
                    for (var i = a.byteLength, o = [], s = 0; s < i; s++)
                      o[s >>> 2] |= a[s] << (24 - (s % 4) * 8);
                    r.call(this, o, i);
                  } else r.apply(this, arguments);
                });
              i.prototype = a;
            }
          })(),
          o.lib.WordArray);
      },
      214: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          (function (a) {
            var r = o,
              i = r.lib,
              s = i.WordArray,
              l = i.Hasher,
              d = r.algo,
              c = [];
            !(function () {
              for (var r = 0; r < 64; r++)
                c[r] = (4294967296 * a.abs(a.sin(r + 1))) | 0;
            })();
            var p = (d.MD5 = l.extend({
              _doReset: function () {
                this._hash = new s.init([
                  1732584193, 4023233417, 2562383102, 271733878,
                ]);
              },
              _doProcessBlock: function (a, r) {
                for (var i = 0; i < 16; i++) {
                  var o = r + i,
                    s = a[o];
                  a[o] =
                    (16711935 & ((s << 8) | (s >>> 24))) |
                    (4278255360 & ((s << 24) | (s >>> 8)));
                }
                var l = this._hash.words,
                  d = a[r + 0],
                  p = a[r + 1],
                  g = a[r + 2],
                  h = a[r + 3],
                  u = a[r + 4],
                  f = a[r + 5],
                  b = a[r + 6],
                  m = a[r + 7],
                  y = a[r + 8],
                  w = a[r + 9],
                  v = a[r + 10],
                  x = a[r + 11],
                  _ = a[r + 12],
                  S = a[r + 13],
                  k = a[r + 14],
                  A = a[r + 15],
                  T = l[0],
                  C = l[1],
                  I = l[2],
                  B = l[3];
                (T = FF(T, C, I, B, d, 7, c[0])),
                  (B = FF(B, T, C, I, p, 12, c[1])),
                  (I = FF(I, B, T, C, g, 17, c[2])),
                  (C = FF(C, I, B, T, h, 22, c[3])),
                  (T = FF(T, C, I, B, u, 7, c[4])),
                  (B = FF(B, T, C, I, f, 12, c[5])),
                  (I = FF(I, B, T, C, b, 17, c[6])),
                  (C = FF(C, I, B, T, m, 22, c[7])),
                  (T = FF(T, C, I, B, y, 7, c[8])),
                  (B = FF(B, T, C, I, w, 12, c[9])),
                  (I = FF(I, B, T, C, v, 17, c[10])),
                  (C = FF(C, I, B, T, x, 22, c[11])),
                  (T = FF(T, C, I, B, _, 7, c[12])),
                  (B = FF(B, T, C, I, S, 12, c[13])),
                  (I = FF(I, B, T, C, k, 17, c[14])),
                  (T = GG(
                    T,
                    (C = FF(C, I, B, T, A, 22, c[15])),
                    I,
                    B,
                    p,
                    5,
                    c[16]
                  )),
                  (B = GG(B, T, C, I, b, 9, c[17])),
                  (I = GG(I, B, T, C, x, 14, c[18])),
                  (C = GG(C, I, B, T, d, 20, c[19])),
                  (T = GG(T, C, I, B, f, 5, c[20])),
                  (B = GG(B, T, C, I, v, 9, c[21])),
                  (I = GG(I, B, T, C, A, 14, c[22])),
                  (C = GG(C, I, B, T, u, 20, c[23])),
                  (T = GG(T, C, I, B, w, 5, c[24])),
                  (B = GG(B, T, C, I, k, 9, c[25])),
                  (I = GG(I, B, T, C, h, 14, c[26])),
                  (C = GG(C, I, B, T, y, 20, c[27])),
                  (T = GG(T, C, I, B, S, 5, c[28])),
                  (B = GG(B, T, C, I, g, 9, c[29])),
                  (I = GG(I, B, T, C, m, 14, c[30])),
                  (T = HH(
                    T,
                    (C = GG(C, I, B, T, _, 20, c[31])),
                    I,
                    B,
                    f,
                    4,
                    c[32]
                  )),
                  (B = HH(B, T, C, I, y, 11, c[33])),
                  (I = HH(I, B, T, C, x, 16, c[34])),
                  (C = HH(C, I, B, T, k, 23, c[35])),
                  (T = HH(T, C, I, B, p, 4, c[36])),
                  (B = HH(B, T, C, I, u, 11, c[37])),
                  (I = HH(I, B, T, C, m, 16, c[38])),
                  (C = HH(C, I, B, T, v, 23, c[39])),
                  (T = HH(T, C, I, B, S, 4, c[40])),
                  (B = HH(B, T, C, I, d, 11, c[41])),
                  (I = HH(I, B, T, C, h, 16, c[42])),
                  (C = HH(C, I, B, T, b, 23, c[43])),
                  (T = HH(T, C, I, B, w, 4, c[44])),
                  (B = HH(B, T, C, I, _, 11, c[45])),
                  (I = HH(I, B, T, C, A, 16, c[46])),
                  (T = II(
                    T,
                    (C = HH(C, I, B, T, g, 23, c[47])),
                    I,
                    B,
                    d,
                    6,
                    c[48]
                  )),
                  (B = II(B, T, C, I, m, 10, c[49])),
                  (I = II(I, B, T, C, k, 15, c[50])),
                  (C = II(C, I, B, T, f, 21, c[51])),
                  (T = II(T, C, I, B, _, 6, c[52])),
                  (B = II(B, T, C, I, h, 10, c[53])),
                  (I = II(I, B, T, C, v, 15, c[54])),
                  (C = II(C, I, B, T, p, 21, c[55])),
                  (T = II(T, C, I, B, y, 6, c[56])),
                  (B = II(B, T, C, I, A, 10, c[57])),
                  (I = II(I, B, T, C, b, 15, c[58])),
                  (C = II(C, I, B, T, S, 21, c[59])),
                  (T = II(T, C, I, B, u, 6, c[60])),
                  (B = II(B, T, C, I, x, 10, c[61])),
                  (I = II(I, B, T, C, g, 15, c[62])),
                  (C = II(C, I, B, T, w, 21, c[63])),
                  (l[0] = (l[0] + T) | 0),
                  (l[1] = (l[1] + C) | 0),
                  (l[2] = (l[2] + I) | 0),
                  (l[3] = (l[3] + B) | 0);
              },
              _doFinalize: function () {
                var r = this._data,
                  i = r.words,
                  o = 8 * this._nDataBytes,
                  s = 8 * r.sigBytes;
                i[s >>> 5] |= 128 << (24 - (s % 32));
                var l = a.floor(o / 4294967296),
                  d = o;
                (i[15 + (((s + 64) >>> 9) << 4)] =
                  (16711935 & ((l << 8) | (l >>> 24))) |
                  (4278255360 & ((l << 24) | (l >>> 8)))),
                  (i[14 + (((s + 64) >>> 9) << 4)] =
                    (16711935 & ((d << 8) | (d >>> 24))) |
                    (4278255360 & ((d << 24) | (d >>> 8)))),
                  (r.sigBytes = 4 * (i.length + 1)),
                  this._process();
                for (var c = this._hash, p = c.words, g = 0; g < 4; g++) {
                  var h = p[g];
                  p[g] =
                    (16711935 & ((h << 8) | (h >>> 24))) |
                    (4278255360 & ((h << 24) | (h >>> 8)));
                }
                return c;
              },
              clone: function () {
                var a = l.clone.call(this);
                return (a._hash = this._hash.clone()), a;
              },
            }));
            function FF(a, r, i, o, s, l, d) {
              var c = a + ((r & i) | (~r & o)) + s + d;
              return ((c << l) | (c >>> (32 - l))) + r;
            }
            function GG(a, r, i, o, s, l, d) {
              var c = a + ((r & o) | (i & ~o)) + s + d;
              return ((c << l) | (c >>> (32 - l))) + r;
            }
            function HH(a, r, i, o, s, l, d) {
              var c = a + (r ^ i ^ o) + s + d;
              return ((c << l) | (c >>> (32 - l))) + r;
            }
            function II(a, r, i, o, s, l, d) {
              var c = a + (i ^ (r | ~o)) + s + d;
              return ((c << l) | (c >>> (32 - l))) + r;
            }
            (r.MD5 = l._createHelper(p)), (r.HmacMD5 = l._createHmacHelper(p));
          })(Math),
          o.MD5);
      },
      568: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          i(109),
          (o.mode.CFB = (function () {
            var a = o.lib.BlockCipherMode.extend();
            function generateKeystreamAndEncrypt(a, r, i, o) {
              var s,
                l = this._iv;
              l
                ? ((s = l.slice(0)), (this._iv = void 0))
                : (s = this._prevBlock),
                o.encryptBlock(s, 0);
              for (var d = 0; d < i; d++) a[r + d] ^= s[d];
            }
            return (
              (a.Encryptor = a.extend({
                processBlock: function (a, r) {
                  var i = this._cipher,
                    o = i.blockSize;
                  generateKeystreamAndEncrypt.call(this, a, r, o, i),
                    (this._prevBlock = a.slice(r, r + o));
                },
              })),
              (a.Decryptor = a.extend({
                processBlock: function (a, r) {
                  var i = this._cipher,
                    o = i.blockSize,
                    s = a.slice(r, r + o);
                  generateKeystreamAndEncrypt.call(this, a, r, o, i),
                    (this._prevBlock = s);
                },
              })),
              a
            );
          })()),
          o.mode.CFB);
      },
      968: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          i(109),
          (o.mode.CTRGladman = (function () {
            var a = o.lib.BlockCipherMode.extend();
            function incWord(a) {
              if (255 == ((a >> 24) & 255)) {
                var r = (a >> 16) & 255,
                  i = (a >> 8) & 255,
                  o = 255 & a;
                255 === r
                  ? ((r = 0),
                    255 === i ? ((i = 0), 255 === o ? (o = 0) : ++o) : ++i)
                  : ++r,
                  (a = 0),
                  (a += r << 16),
                  (a += i << 8),
                  (a += o);
              } else a += 1 << 24;
              return a;
            }
            function incCounter(a) {
              return 0 === (a[0] = incWord(a[0])) && (a[1] = incWord(a[1])), a;
            }
            var r = (a.Encryptor = a.extend({
              processBlock: function (a, r) {
                var i = this._cipher,
                  o = i.blockSize,
                  s = this._iv,
                  l = this._counter;
                s && ((l = this._counter = s.slice(0)), (this._iv = void 0)),
                  incCounter(l);
                var d = l.slice(0);
                i.encryptBlock(d, 0);
                for (var c = 0; c < o; c++) a[r + c] ^= d[c];
              },
            }));
            return (a.Decryptor = r), a;
          })()),
          o.mode.CTRGladman);
      },
      242: function (a, r, i) {
        var o, s, l;
        a.exports =
          ((l = i(249)),
          i(109),
          (l.mode.CTR =
            ((o = l.lib.BlockCipherMode.extend()),
            (s = o.Encryptor =
              o.extend({
                processBlock: function (a, r) {
                  var i = this._cipher,
                    o = i.blockSize,
                    s = this._iv,
                    l = this._counter;
                  s && ((l = this._counter = s.slice(0)), (this._iv = void 0));
                  var d = l.slice(0);
                  i.encryptBlock(d, 0), (l[o - 1] = (l[o - 1] + 1) | 0);
                  for (var c = 0; c < o; c++) a[r + c] ^= d[c];
                },
              })),
            (o.Decryptor = s),
            o)),
          l.mode.CTR);
      },
      148: function (a, r, i) {
        var o, s;
        a.exports =
          ((s = i(249)),
          i(109),
          (s.mode.ECB =
            (((o = s.lib.BlockCipherMode.extend()).Encryptor = o.extend({
              processBlock: function (a, r) {
                this._cipher.encryptBlock(a, r);
              },
            })),
            (o.Decryptor = o.extend({
              processBlock: function (a, r) {
                this._cipher.decryptBlock(a, r);
              },
            })),
            o)),
          s.mode.ECB);
      },
      660: function (a, r, i) {
        var o, s, l;
        a.exports =
          ((l = i(249)),
          i(109),
          (l.mode.OFB =
            ((o = l.lib.BlockCipherMode.extend()),
            (s = o.Encryptor =
              o.extend({
                processBlock: function (a, r) {
                  var i = this._cipher,
                    o = i.blockSize,
                    s = this._iv,
                    l = this._keystream;
                  s &&
                    ((l = this._keystream = s.slice(0)), (this._iv = void 0)),
                    i.encryptBlock(l, 0);
                  for (var d = 0; d < o; d++) a[r + d] ^= l[d];
                },
              })),
            (o.Decryptor = s),
            o)),
          l.mode.OFB);
      },
      615: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          i(109),
          (o.pad.AnsiX923 = {
            pad: function (a, r) {
              var i = a.sigBytes,
                o = 4 * r,
                s = o - (i % o),
                l = i + s - 1;
              a.clamp(),
                (a.words[l >>> 2] |= s << (24 - (l % 4) * 8)),
                (a.sigBytes += s);
            },
            unpad: function (a) {
              var r = 255 & a.words[(a.sigBytes - 1) >>> 2];
              a.sigBytes -= r;
            },
          }),
          o.pad.Ansix923);
      },
      807: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          i(109),
          (o.pad.Iso10126 = {
            pad: function (a, r) {
              var i = 4 * r,
                s = i - (a.sigBytes % i);
              a.concat(o.lib.WordArray.random(s - 1)).concat(
                o.lib.WordArray.create([s << 24], 1)
              );
            },
            unpad: function (a) {
              var r = 255 & a.words[(a.sigBytes - 1) >>> 2];
              a.sigBytes -= r;
            },
          }),
          o.pad.Iso10126);
      },
      77: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          i(109),
          (o.pad.Iso97971 = {
            pad: function (a, r) {
              a.concat(o.lib.WordArray.create([2147483648], 1)),
                o.pad.ZeroPadding.pad(a, r);
            },
            unpad: function (a) {
              o.pad.ZeroPadding.unpad(a), a.sigBytes--;
            },
          }),
          o.pad.Iso97971);
      },
      991: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          i(109),
          (o.pad.NoPadding = { pad: function () {}, unpad: function () {} }),
          o.pad.NoPadding);
      },
      475: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          i(109),
          (o.pad.ZeroPadding = {
            pad: function (a, r) {
              var i = 4 * r;
              a.clamp(), (a.sigBytes += i - (a.sigBytes % i || i));
            },
            unpad: function (a) {
              var r = a.words,
                i = a.sigBytes - 1;
              for (i = a.sigBytes - 1; i >= 0; i--)
                if ((r[i >>> 2] >>> (24 - (i % 4) * 8)) & 255) {
                  a.sigBytes = i + 1;
                  break;
                }
            },
          }),
          o.pad.ZeroPadding);
      },
      112: function (a, r, i) {
        var o, s, l, d, c, p, g, h, u;
        a.exports =
          ((u = i(249)),
          i(783),
          i(824),
          (s = (o = u).lib),
          (l = s.Base),
          (d = s.WordArray),
          (c = o.algo),
          (p = c.SHA1),
          (g = c.HMAC),
          (h = c.PBKDF2 =
            l.extend({
              cfg: l.extend({ keySize: 4, hasher: p, iterations: 1 }),
              init: function (a) {
                this.cfg = this.cfg.extend(a);
              },
              compute: function (a, r) {
                for (
                  var i = this.cfg,
                    o = g.create(i.hasher, a),
                    s = d.create(),
                    l = d.create([1]),
                    c = s.words,
                    p = l.words,
                    h = i.keySize,
                    u = i.iterations;
                  c.length < h;

                ) {
                  var f = o.update(r).finalize(l);
                  o.reset();
                  for (
                    var b = f.words, m = b.length, y = f, w = 1;
                    w < u;
                    w++
                  ) {
                    (y = o.finalize(y)), o.reset();
                    for (var v = y.words, x = 0; x < m; x++) b[x] ^= v[x];
                  }
                  s.concat(f), p[0]++;
                }
                return (s.sigBytes = 4 * h), s;
              },
            })),
          (o.PBKDF2 = function (a, r, i) {
            return h.create(i).compute(a, r);
          }),
          u.PBKDF2);
      },
      974: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          i(269),
          i(214),
          i(888),
          i(109),
          (function () {
            var a = o,
              r = a.lib.StreamCipher,
              i = a.algo,
              s = [],
              l = [],
              d = [],
              c = (i.RabbitLegacy = r.extend({
                _doReset: function () {
                  var a = this._key.words,
                    r = this.cfg.iv,
                    i = (this._X = [
                      a[0],
                      (a[3] << 16) | (a[2] >>> 16),
                      a[1],
                      (a[0] << 16) | (a[3] >>> 16),
                      a[2],
                      (a[1] << 16) | (a[0] >>> 16),
                      a[3],
                      (a[2] << 16) | (a[1] >>> 16),
                    ]),
                    o = (this._C = [
                      (a[2] << 16) | (a[2] >>> 16),
                      (4294901760 & a[0]) | (65535 & a[1]),
                      (a[3] << 16) | (a[3] >>> 16),
                      (4294901760 & a[1]) | (65535 & a[2]),
                      (a[0] << 16) | (a[0] >>> 16),
                      (4294901760 & a[2]) | (65535 & a[3]),
                      (a[1] << 16) | (a[1] >>> 16),
                      (4294901760 & a[3]) | (65535 & a[0]),
                    ]);
                  this._b = 0;
                  for (var s = 0; s < 4; s++) nextState.call(this);
                  for (s = 0; s < 8; s++) o[s] ^= i[(s + 4) & 7];
                  if (r) {
                    var l = r.words,
                      d = l[0],
                      c = l[1],
                      p =
                        (16711935 & ((d << 8) | (d >>> 24))) |
                        (4278255360 & ((d << 24) | (d >>> 8))),
                      g =
                        (16711935 & ((c << 8) | (c >>> 24))) |
                        (4278255360 & ((c << 24) | (c >>> 8))),
                      h = (p >>> 16) | (4294901760 & g),
                      u = (g << 16) | (65535 & p);
                    for (
                      o[0] ^= p,
                        o[1] ^= h,
                        o[2] ^= g,
                        o[3] ^= u,
                        o[4] ^= p,
                        o[5] ^= h,
                        o[6] ^= g,
                        o[7] ^= u,
                        s = 0;
                      s < 4;
                      s++
                    )
                      nextState.call(this);
                  }
                },
                _doProcessBlock: function (a, r) {
                  var i = this._X;
                  nextState.call(this),
                    (s[0] = i[0] ^ (i[5] >>> 16) ^ (i[3] << 16)),
                    (s[1] = i[2] ^ (i[7] >>> 16) ^ (i[5] << 16)),
                    (s[2] = i[4] ^ (i[1] >>> 16) ^ (i[7] << 16)),
                    (s[3] = i[6] ^ (i[3] >>> 16) ^ (i[1] << 16));
                  for (var o = 0; o < 4; o++)
                    (s[o] =
                      (16711935 & ((s[o] << 8) | (s[o] >>> 24))) |
                      (4278255360 & ((s[o] << 24) | (s[o] >>> 8)))),
                      (a[r + o] ^= s[o]);
                },
                blockSize: 4,
                ivSize: 2,
              }));
            function nextState() {
              for (var a = this._X, r = this._C, i = 0; i < 8; i++) l[i] = r[i];
              for (
                r[0] = (r[0] + 1295307597 + this._b) | 0,
                  r[1] =
                    (r[1] + 3545052371 + (r[0] >>> 0 < l[0] >>> 0 ? 1 : 0)) | 0,
                  r[2] =
                    (r[2] + 886263092 + (r[1] >>> 0 < l[1] >>> 0 ? 1 : 0)) | 0,
                  r[3] =
                    (r[3] + 1295307597 + (r[2] >>> 0 < l[2] >>> 0 ? 1 : 0)) | 0,
                  r[4] =
                    (r[4] + 3545052371 + (r[3] >>> 0 < l[3] >>> 0 ? 1 : 0)) | 0,
                  r[5] =
                    (r[5] + 886263092 + (r[4] >>> 0 < l[4] >>> 0 ? 1 : 0)) | 0,
                  r[6] =
                    (r[6] + 1295307597 + (r[5] >>> 0 < l[5] >>> 0 ? 1 : 0)) | 0,
                  r[7] =
                    (r[7] + 3545052371 + (r[6] >>> 0 < l[6] >>> 0 ? 1 : 0)) | 0,
                  this._b = r[7] >>> 0 < l[7] >>> 0 ? 1 : 0,
                  i = 0;
                i < 8;
                i++
              ) {
                var o = a[i] + r[i],
                  s = 65535 & o,
                  c = o >>> 16,
                  p = ((((s * s) >>> 17) + s * c) >>> 15) + c * c,
                  g = (((4294901760 & o) * o) | 0) + (((65535 & o) * o) | 0);
                d[i] = p ^ g;
              }
              (a[0] =
                (d[0] +
                  ((d[7] << 16) | (d[7] >>> 16)) +
                  ((d[6] << 16) | (d[6] >>> 16))) |
                0),
                (a[1] = (d[1] + ((d[0] << 8) | (d[0] >>> 24)) + d[7]) | 0),
                (a[2] =
                  (d[2] +
                    ((d[1] << 16) | (d[1] >>> 16)) +
                    ((d[0] << 16) | (d[0] >>> 16))) |
                  0),
                (a[3] = (d[3] + ((d[2] << 8) | (d[2] >>> 24)) + d[1]) | 0),
                (a[4] =
                  (d[4] +
                    ((d[3] << 16) | (d[3] >>> 16)) +
                    ((d[2] << 16) | (d[2] >>> 16))) |
                  0),
                (a[5] = (d[5] + ((d[4] << 8) | (d[4] >>> 24)) + d[3]) | 0),
                (a[6] =
                  (d[6] +
                    ((d[5] << 16) | (d[5] >>> 16)) +
                    ((d[4] << 16) | (d[4] >>> 16))) |
                  0),
                (a[7] = (d[7] + ((d[6] << 8) | (d[6] >>> 24)) + d[5]) | 0);
            }
            a.RabbitLegacy = r._createHelper(c);
          })(),
          o.RabbitLegacy);
      },
      454: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          i(269),
          i(214),
          i(888),
          i(109),
          (function () {
            var a = o,
              r = a.lib.StreamCipher,
              i = a.algo,
              s = [],
              l = [],
              d = [],
              c = (i.Rabbit = r.extend({
                _doReset: function () {
                  for (
                    var a = this._key.words, r = this.cfg.iv, i = 0;
                    i < 4;
                    i++
                  )
                    a[i] =
                      (16711935 & ((a[i] << 8) | (a[i] >>> 24))) |
                      (4278255360 & ((a[i] << 24) | (a[i] >>> 8)));
                  var o = (this._X = [
                      a[0],
                      (a[3] << 16) | (a[2] >>> 16),
                      a[1],
                      (a[0] << 16) | (a[3] >>> 16),
                      a[2],
                      (a[1] << 16) | (a[0] >>> 16),
                      a[3],
                      (a[2] << 16) | (a[1] >>> 16),
                    ]),
                    s = (this._C = [
                      (a[2] << 16) | (a[2] >>> 16),
                      (4294901760 & a[0]) | (65535 & a[1]),
                      (a[3] << 16) | (a[3] >>> 16),
                      (4294901760 & a[1]) | (65535 & a[2]),
                      (a[0] << 16) | (a[0] >>> 16),
                      (4294901760 & a[2]) | (65535 & a[3]),
                      (a[1] << 16) | (a[1] >>> 16),
                      (4294901760 & a[3]) | (65535 & a[0]),
                    ]);
                  for (this._b = 0, i = 0; i < 4; i++) nextState.call(this);
                  for (i = 0; i < 8; i++) s[i] ^= o[(i + 4) & 7];
                  if (r) {
                    var l = r.words,
                      d = l[0],
                      c = l[1],
                      p =
                        (16711935 & ((d << 8) | (d >>> 24))) |
                        (4278255360 & ((d << 24) | (d >>> 8))),
                      g =
                        (16711935 & ((c << 8) | (c >>> 24))) |
                        (4278255360 & ((c << 24) | (c >>> 8))),
                      h = (p >>> 16) | (4294901760 & g),
                      u = (g << 16) | (65535 & p);
                    for (
                      s[0] ^= p,
                        s[1] ^= h,
                        s[2] ^= g,
                        s[3] ^= u,
                        s[4] ^= p,
                        s[5] ^= h,
                        s[6] ^= g,
                        s[7] ^= u,
                        i = 0;
                      i < 4;
                      i++
                    )
                      nextState.call(this);
                  }
                },
                _doProcessBlock: function (a, r) {
                  var i = this._X;
                  nextState.call(this),
                    (s[0] = i[0] ^ (i[5] >>> 16) ^ (i[3] << 16)),
                    (s[1] = i[2] ^ (i[7] >>> 16) ^ (i[5] << 16)),
                    (s[2] = i[4] ^ (i[1] >>> 16) ^ (i[7] << 16)),
                    (s[3] = i[6] ^ (i[3] >>> 16) ^ (i[1] << 16));
                  for (var o = 0; o < 4; o++)
                    (s[o] =
                      (16711935 & ((s[o] << 8) | (s[o] >>> 24))) |
                      (4278255360 & ((s[o] << 24) | (s[o] >>> 8)))),
                      (a[r + o] ^= s[o]);
                },
                blockSize: 4,
                ivSize: 2,
              }));
            function nextState() {
              for (var a = this._X, r = this._C, i = 0; i < 8; i++) l[i] = r[i];
              for (
                r[0] = (r[0] + 1295307597 + this._b) | 0,
                  r[1] =
                    (r[1] + 3545052371 + (r[0] >>> 0 < l[0] >>> 0 ? 1 : 0)) | 0,
                  r[2] =
                    (r[2] + 886263092 + (r[1] >>> 0 < l[1] >>> 0 ? 1 : 0)) | 0,
                  r[3] =
                    (r[3] + 1295307597 + (r[2] >>> 0 < l[2] >>> 0 ? 1 : 0)) | 0,
                  r[4] =
                    (r[4] + 3545052371 + (r[3] >>> 0 < l[3] >>> 0 ? 1 : 0)) | 0,
                  r[5] =
                    (r[5] + 886263092 + (r[4] >>> 0 < l[4] >>> 0 ? 1 : 0)) | 0,
                  r[6] =
                    (r[6] + 1295307597 + (r[5] >>> 0 < l[5] >>> 0 ? 1 : 0)) | 0,
                  r[7] =
                    (r[7] + 3545052371 + (r[6] >>> 0 < l[6] >>> 0 ? 1 : 0)) | 0,
                  this._b = r[7] >>> 0 < l[7] >>> 0 ? 1 : 0,
                  i = 0;
                i < 8;
                i++
              ) {
                var o = a[i] + r[i],
                  s = 65535 & o,
                  c = o >>> 16,
                  p = ((((s * s) >>> 17) + s * c) >>> 15) + c * c,
                  g = (((4294901760 & o) * o) | 0) + (((65535 & o) * o) | 0);
                d[i] = p ^ g;
              }
              (a[0] =
                (d[0] +
                  ((d[7] << 16) | (d[7] >>> 16)) +
                  ((d[6] << 16) | (d[6] >>> 16))) |
                0),
                (a[1] = (d[1] + ((d[0] << 8) | (d[0] >>> 24)) + d[7]) | 0),
                (a[2] =
                  (d[2] +
                    ((d[1] << 16) | (d[1] >>> 16)) +
                    ((d[0] << 16) | (d[0] >>> 16))) |
                  0),
                (a[3] = (d[3] + ((d[2] << 8) | (d[2] >>> 24)) + d[1]) | 0),
                (a[4] =
                  (d[4] +
                    ((d[3] << 16) | (d[3] >>> 16)) +
                    ((d[2] << 16) | (d[2] >>> 16))) |
                  0),
                (a[5] = (d[5] + ((d[4] << 8) | (d[4] >>> 24)) + d[3]) | 0),
                (a[6] =
                  (d[6] +
                    ((d[5] << 16) | (d[5] >>> 16)) +
                    ((d[4] << 16) | (d[4] >>> 16))) |
                  0),
                (a[7] = (d[7] + ((d[6] << 8) | (d[6] >>> 24)) + d[5]) | 0);
            }
            a.Rabbit = r._createHelper(c);
          })(),
          o.Rabbit);
      },
      857: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          i(269),
          i(214),
          i(888),
          i(109),
          (function () {
            var a = o,
              r = a.lib.StreamCipher,
              i = a.algo,
              s = (i.RC4 = r.extend({
                _doReset: function () {
                  for (
                    var a = this._key,
                      r = a.words,
                      i = a.sigBytes,
                      o = (this._S = []),
                      s = 0;
                    s < 256;
                    s++
                  )
                    o[s] = s;
                  s = 0;
                  for (var l = 0; s < 256; s++) {
                    var d = s % i,
                      c = (r[d >>> 2] >>> (24 - (d % 4) * 8)) & 255;
                    l = (l + o[s] + c) % 256;
                    var p = o[s];
                    (o[s] = o[l]), (o[l] = p);
                  }
                  this._i = this._j = 0;
                },
                _doProcessBlock: function (a, r) {
                  a[r] ^= generateKeystreamWord.call(this);
                },
                keySize: 8,
                ivSize: 0,
              }));
            function generateKeystreamWord() {
              for (
                var a = this._S, r = this._i, i = this._j, o = 0, s = 0;
                s < 4;
                s++
              ) {
                i = (i + a[(r = (r + 1) % 256)]) % 256;
                var l = a[r];
                (a[r] = a[i]),
                  (a[i] = l),
                  (o |= a[(a[r] + a[i]) % 256] << (24 - 8 * s));
              }
              return (this._i = r), (this._j = i), o;
            }
            a.RC4 = r._createHelper(s);
            var l = (i.RC4Drop = s.extend({
              cfg: s.cfg.extend({ drop: 192 }),
              _doReset: function () {
                s._doReset.call(this);
                for (var a = this.cfg.drop; a > 0; a--)
                  generateKeystreamWord.call(this);
              },
            }));
            a.RC4Drop = r._createHelper(l);
          })(),
          o.RC4);
      },
      706: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          (function (a) {
            var r = o,
              i = r.lib,
              s = i.WordArray,
              l = i.Hasher,
              d = r.algo,
              c = s.create([
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13,
                1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15,
                8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13,
                3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8,
                11, 6, 15, 13,
              ]),
              p = s.create([
                5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3,
                7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14,
                6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5,
                12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13,
                14, 0, 3, 9, 11,
              ]),
              g = s.create([
                11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8,
                13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14,
                9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9,
                8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12,
                13, 14, 11, 8, 5, 6,
              ]),
              h = s.create([
                8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13,
                15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11,
                8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14,
                6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8,
                13, 6, 5, 15, 13, 11, 11,
              ]),
              u = s.create([0, 1518500249, 1859775393, 2400959708, 2840853838]),
              f = s.create([1352829926, 1548603684, 1836072691, 2053994217, 0]),
              b = (d.RIPEMD160 = l.extend({
                _doReset: function () {
                  this._hash = s.create([
                    1732584193, 4023233417, 2562383102, 271733878, 3285377520,
                  ]);
                },
                _doProcessBlock: function (a, r) {
                  for (var i = 0; i < 16; i++) {
                    var o = r + i,
                      s = a[o];
                    a[o] =
                      (16711935 & ((s << 8) | (s >>> 24))) |
                      (4278255360 & ((s << 24) | (s >>> 8)));
                  }
                  var l,
                    d,
                    b,
                    m,
                    y,
                    w,
                    v,
                    x,
                    _,
                    S,
                    k,
                    A = this._hash.words,
                    T = u.words,
                    C = f.words,
                    I = c.words,
                    B = p.words,
                    D = g.words,
                    E = h.words;
                  for (
                    w = l = A[0],
                      v = d = A[1],
                      x = b = A[2],
                      _ = m = A[3],
                      S = y = A[4],
                      i = 0;
                    i < 80;
                    i += 1
                  )
                    (k = (l + a[r + I[i]]) | 0),
                      (k +=
                        i < 16
                          ? f1(d, b, m) + T[0]
                          : i < 32
                          ? f2(d, b, m) + T[1]
                          : i < 48
                          ? f3(d, b, m) + T[2]
                          : i < 64
                          ? f4(d, b, m) + T[3]
                          : f5(d, b, m) + T[4]),
                      (k = ((k = rotl((k |= 0), D[i])) + y) | 0),
                      (l = y),
                      (y = m),
                      (m = rotl(b, 10)),
                      (b = d),
                      (d = k),
                      (k = (w + a[r + B[i]]) | 0),
                      (k +=
                        i < 16
                          ? f5(v, x, _) + C[0]
                          : i < 32
                          ? f4(v, x, _) + C[1]
                          : i < 48
                          ? f3(v, x, _) + C[2]
                          : i < 64
                          ? f2(v, x, _) + C[3]
                          : f1(v, x, _) + C[4]),
                      (k = ((k = rotl((k |= 0), E[i])) + S) | 0),
                      (w = S),
                      (S = _),
                      (_ = rotl(x, 10)),
                      (x = v),
                      (v = k);
                  (k = (A[1] + b + _) | 0),
                    (A[1] = (A[2] + m + S) | 0),
                    (A[2] = (A[3] + y + w) | 0),
                    (A[3] = (A[4] + l + v) | 0),
                    (A[4] = (A[0] + d + x) | 0),
                    (A[0] = k);
                },
                _doFinalize: function () {
                  var a = this._data,
                    r = a.words,
                    i = 8 * this._nDataBytes,
                    o = 8 * a.sigBytes;
                  (r[o >>> 5] |= 128 << (24 - (o % 32))),
                    (r[14 + (((o + 64) >>> 9) << 4)] =
                      (16711935 & ((i << 8) | (i >>> 24))) |
                      (4278255360 & ((i << 24) | (i >>> 8)))),
                    (a.sigBytes = 4 * (r.length + 1)),
                    this._process();
                  for (var s = this._hash, l = s.words, d = 0; d < 5; d++) {
                    var c = l[d];
                    l[d] =
                      (16711935 & ((c << 8) | (c >>> 24))) |
                      (4278255360 & ((c << 24) | (c >>> 8)));
                  }
                  return s;
                },
                clone: function () {
                  var a = l.clone.call(this);
                  return (a._hash = this._hash.clone()), a;
                },
              }));
            function f1(a, r, i) {
              return a ^ r ^ i;
            }
            function f2(a, r, i) {
              return (a & r) | (~a & i);
            }
            function f3(a, r, i) {
              return (a | ~r) ^ i;
            }
            function f4(a, r, i) {
              return (a & i) | (r & ~i);
            }
            function f5(a, r, i) {
              return a ^ (r | ~i);
            }
            function rotl(a, r) {
              return (a << r) | (a >>> (32 - r));
            }
            (r.RIPEMD160 = l._createHelper(b)),
              (r.HmacRIPEMD160 = l._createHmacHelper(b));
          })(Math),
          o.RIPEMD160);
      },
      783: function (a, r, i) {
        var o, s, l, d, c, p, g, h;
        a.exports =
          ((h = i(249)),
          (s = (o = h).lib),
          (l = s.WordArray),
          (d = s.Hasher),
          (c = o.algo),
          (p = []),
          (g = c.SHA1 =
            d.extend({
              _doReset: function () {
                this._hash = new l.init([
                  1732584193, 4023233417, 2562383102, 271733878, 3285377520,
                ]);
              },
              _doProcessBlock: function (a, r) {
                for (
                  var i = this._hash.words,
                    o = i[0],
                    s = i[1],
                    l = i[2],
                    d = i[3],
                    c = i[4],
                    g = 0;
                  g < 80;
                  g++
                ) {
                  if (g < 16) p[g] = 0 | a[r + g];
                  else {
                    var h = p[g - 3] ^ p[g - 8] ^ p[g - 14] ^ p[g - 16];
                    p[g] = (h << 1) | (h >>> 31);
                  }
                  var u = ((o << 5) | (o >>> 27)) + c + p[g];
                  (u +=
                    g < 20
                      ? 1518500249 + ((s & l) | (~s & d))
                      : g < 40
                      ? 1859775393 + (s ^ l ^ d)
                      : g < 60
                      ? ((s & l) | (s & d) | (l & d)) - 1894007588
                      : (s ^ l ^ d) - 899497514),
                    (c = d),
                    (d = l),
                    (l = (s << 30) | (s >>> 2)),
                    (s = o),
                    (o = u);
                }
                (i[0] = (i[0] + o) | 0),
                  (i[1] = (i[1] + s) | 0),
                  (i[2] = (i[2] + l) | 0),
                  (i[3] = (i[3] + d) | 0),
                  (i[4] = (i[4] + c) | 0);
              },
              _doFinalize: function () {
                var a = this._data,
                  r = a.words,
                  i = 8 * this._nDataBytes,
                  o = 8 * a.sigBytes;
                return (
                  (r[o >>> 5] |= 128 << (24 - (o % 32))),
                  (r[14 + (((o + 64) >>> 9) << 4)] = Math.floor(
                    i / 4294967296
                  )),
                  (r[15 + (((o + 64) >>> 9) << 4)] = i),
                  (a.sigBytes = 4 * r.length),
                  this._process(),
                  this._hash
                );
              },
              clone: function () {
                var a = d.clone.call(this);
                return (a._hash = this._hash.clone()), a;
              },
            })),
          (o.SHA1 = d._createHelper(g)),
          (o.HmacSHA1 = d._createHmacHelper(g)),
          h.SHA1);
      },
      792: function (a, r, i) {
        var o, s, l, d, c, p;
        a.exports =
          ((p = i(249)),
          i(153),
          (s = (o = p).lib.WordArray),
          (l = o.algo),
          (d = l.SHA256),
          (c = l.SHA224 =
            d.extend({
              _doReset: function () {
                this._hash = new s.init([
                  3238371032, 914150663, 812702999, 4144912697, 4290775857,
                  1750603025, 1694076839, 3204075428,
                ]);
              },
              _doFinalize: function () {
                var a = d._doFinalize.call(this);
                return (a.sigBytes -= 4), a;
              },
            })),
          (o.SHA224 = d._createHelper(c)),
          (o.HmacSHA224 = d._createHmacHelper(c)),
          p.SHA224);
      },
      153: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          (function (a) {
            var r = o,
              i = r.lib,
              s = i.WordArray,
              l = i.Hasher,
              d = r.algo,
              c = [],
              p = [];
            !(function () {
              function isPrime(r) {
                for (var i = a.sqrt(r), o = 2; o <= i; o++)
                  if (!(r % o)) return !1;
                return !0;
              }
              function getFractionalBits(a) {
                return (4294967296 * (a - (0 | a))) | 0;
              }
              for (var r = 2, i = 0; i < 64; )
                isPrime(r) &&
                  (i < 8 && (c[i] = getFractionalBits(a.pow(r, 0.5))),
                  (p[i] = getFractionalBits(a.pow(r, 1 / 3))),
                  i++),
                  r++;
            })();
            var g = [],
              h = (d.SHA256 = l.extend({
                _doReset: function () {
                  this._hash = new s.init(c.slice(0));
                },
                _doProcessBlock: function (a, r) {
                  for (
                    var i = this._hash.words,
                      o = i[0],
                      s = i[1],
                      l = i[2],
                      d = i[3],
                      c = i[4],
                      h = i[5],
                      u = i[6],
                      f = i[7],
                      b = 0;
                    b < 64;
                    b++
                  ) {
                    if (b < 16) g[b] = 0 | a[r + b];
                    else {
                      var m = g[b - 15],
                        y =
                          ((m << 25) | (m >>> 7)) ^
                          ((m << 14) | (m >>> 18)) ^
                          (m >>> 3),
                        w = g[b - 2],
                        v =
                          ((w << 15) | (w >>> 17)) ^
                          ((w << 13) | (w >>> 19)) ^
                          (w >>> 10);
                      g[b] = y + g[b - 7] + v + g[b - 16];
                    }
                    var x = (o & s) ^ (o & l) ^ (s & l),
                      _ =
                        ((o << 30) | (o >>> 2)) ^
                        ((o << 19) | (o >>> 13)) ^
                        ((o << 10) | (o >>> 22)),
                      S =
                        f +
                        (((c << 26) | (c >>> 6)) ^
                          ((c << 21) | (c >>> 11)) ^
                          ((c << 7) | (c >>> 25))) +
                        ((c & h) ^ (~c & u)) +
                        p[b] +
                        g[b];
                    (f = u),
                      (u = h),
                      (h = c),
                      (c = (d + S) | 0),
                      (d = l),
                      (l = s),
                      (s = o),
                      (o = (S + (_ + x)) | 0);
                  }
                  (i[0] = (i[0] + o) | 0),
                    (i[1] = (i[1] + s) | 0),
                    (i[2] = (i[2] + l) | 0),
                    (i[3] = (i[3] + d) | 0),
                    (i[4] = (i[4] + c) | 0),
                    (i[5] = (i[5] + h) | 0),
                    (i[6] = (i[6] + u) | 0),
                    (i[7] = (i[7] + f) | 0);
                },
                _doFinalize: function () {
                  var r = this._data,
                    i = r.words,
                    o = 8 * this._nDataBytes,
                    s = 8 * r.sigBytes;
                  return (
                    (i[s >>> 5] |= 128 << (24 - (s % 32))),
                    (i[14 + (((s + 64) >>> 9) << 4)] = a.floor(o / 4294967296)),
                    (i[15 + (((s + 64) >>> 9) << 4)] = o),
                    (r.sigBytes = 4 * i.length),
                    this._process(),
                    this._hash
                  );
                },
                clone: function () {
                  var a = l.clone.call(this);
                  return (a._hash = this._hash.clone()), a;
                },
              }));
            (r.SHA256 = l._createHelper(h)),
              (r.HmacSHA256 = l._createHmacHelper(h));
          })(Math),
          o.SHA256);
      },
      327: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          i(938),
          (function (a) {
            var r = o,
              i = r.lib,
              s = i.WordArray,
              l = i.Hasher,
              d = r.x64.Word,
              c = r.algo,
              p = [],
              g = [],
              h = [];
            !(function () {
              for (var a = 1, r = 0, i = 0; i < 24; i++) {
                p[a + 5 * r] = (((i + 1) * (i + 2)) / 2) % 64;
                var o = (2 * a + 3 * r) % 5;
                (a = r % 5), (r = o);
              }
              for (a = 0; a < 5; a++)
                for (r = 0; r < 5; r++)
                  g[a + 5 * r] = r + ((2 * a + 3 * r) % 5) * 5;
              for (var s = 1, l = 0; l < 24; l++) {
                for (var c = 0, u = 0, f = 0; f < 7; f++) {
                  if (1 & s) {
                    var b = (1 << f) - 1;
                    b < 32 ? (u ^= 1 << b) : (c ^= 1 << (b - 32));
                  }
                  128 & s ? (s = (s << 1) ^ 113) : (s <<= 1);
                }
                h[l] = d.create(c, u);
              }
            })();
            var u = [];
            !(function () {
              for (var a = 0; a < 25; a++) u[a] = d.create();
            })();
            var f = (c.SHA3 = l.extend({
              cfg: l.cfg.extend({ outputLength: 512 }),
              _doReset: function () {
                for (var a = (this._state = []), r = 0; r < 25; r++)
                  a[r] = new d.init();
                this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
              },
              _doProcessBlock: function (a, r) {
                for (
                  var i = this._state, o = this.blockSize / 2, s = 0;
                  s < o;
                  s++
                ) {
                  var l = a[r + 2 * s],
                    d = a[r + 2 * s + 1];
                  (l =
                    (16711935 & ((l << 8) | (l >>> 24))) |
                    (4278255360 & ((l << 24) | (l >>> 8)))),
                    (d =
                      (16711935 & ((d << 8) | (d >>> 24))) |
                      (4278255360 & ((d << 24) | (d >>> 8)))),
                    ((E = i[s]).high ^= d),
                    (E.low ^= l);
                }
                for (var c = 0; c < 24; c++) {
                  for (var f = 0; f < 5; f++) {
                    for (var b = 0, m = 0, y = 0; y < 5; y++)
                      (b ^= (E = i[f + 5 * y]).high), (m ^= E.low);
                    var w = u[f];
                    (w.high = b), (w.low = m);
                  }
                  for (f = 0; f < 5; f++) {
                    var v = u[(f + 4) % 5],
                      x = u[(f + 1) % 5],
                      _ = x.high,
                      S = x.low;
                    for (
                      b = v.high ^ ((_ << 1) | (S >>> 31)),
                        m = v.low ^ ((S << 1) | (_ >>> 31)),
                        y = 0;
                      y < 5;
                      y++
                    )
                      ((E = i[f + 5 * y]).high ^= b), (E.low ^= m);
                  }
                  for (var k = 1; k < 25; k++) {
                    var A = (E = i[k]).high,
                      T = E.low,
                      C = p[k];
                    C < 32
                      ? ((b = (A << C) | (T >>> (32 - C))),
                        (m = (T << C) | (A >>> (32 - C))))
                      : ((b = (T << (C - 32)) | (A >>> (64 - C))),
                        (m = (A << (C - 32)) | (T >>> (64 - C))));
                    var I = u[g[k]];
                    (I.high = b), (I.low = m);
                  }
                  var B = u[0],
                    D = i[0];
                  for (B.high = D.high, B.low = D.low, f = 0; f < 5; f++)
                    for (y = 0; y < 5; y++) {
                      var E = i[(k = f + 5 * y)],
                        z = u[k],
                        N = u[((f + 1) % 5) + 5 * y],
                        O = u[((f + 2) % 5) + 5 * y];
                      (E.high = z.high ^ (~N.high & O.high)),
                        (E.low = z.low ^ (~N.low & O.low));
                    }
                  E = i[0];
                  var M = h[c];
                  (E.high ^= M.high), (E.low ^= M.low);
                }
              },
              _doFinalize: function () {
                var r = this._data,
                  i = r.words,
                  o = (this._nDataBytes, 8 * r.sigBytes),
                  l = 32 * this.blockSize;
                (i[o >>> 5] |= 1 << (24 - (o % 32))),
                  (i[((a.ceil((o + 1) / l) * l) >>> 5) - 1] |= 128),
                  (r.sigBytes = 4 * i.length),
                  this._process();
                for (
                  var d = this._state,
                    c = this.cfg.outputLength / 8,
                    p = c / 8,
                    g = [],
                    h = 0;
                  h < p;
                  h++
                ) {
                  var u = d[h],
                    f = u.high,
                    b = u.low;
                  (f =
                    (16711935 & ((f << 8) | (f >>> 24))) |
                    (4278255360 & ((f << 24) | (f >>> 8)))),
                    (b =
                      (16711935 & ((b << 8) | (b >>> 24))) |
                      (4278255360 & ((b << 24) | (b >>> 8)))),
                    g.push(b),
                    g.push(f);
                }
                return new s.init(g, c);
              },
              clone: function () {
                for (
                  var a = l.clone.call(this),
                    r = (a._state = this._state.slice(0)),
                    i = 0;
                  i < 25;
                  i++
                )
                  r[i] = r[i].clone();
                return a;
              },
            }));
            (r.SHA3 = l._createHelper(f)),
              (r.HmacSHA3 = l._createHmacHelper(f));
          })(Math),
          o.SHA3);
      },
      460: function (a, r, i) {
        var o, s, l, d, c, p, g, h;
        a.exports =
          ((h = i(249)),
          i(938),
          i(34),
          (s = (o = h).x64),
          (l = s.Word),
          (d = s.WordArray),
          (c = o.algo),
          (p = c.SHA512),
          (g = c.SHA384 =
            p.extend({
              _doReset: function () {
                this._hash = new d.init([
                  new l.init(3418070365, 3238371032),
                  new l.init(1654270250, 914150663),
                  new l.init(2438529370, 812702999),
                  new l.init(355462360, 4144912697),
                  new l.init(1731405415, 4290775857),
                  new l.init(2394180231, 1750603025),
                  new l.init(3675008525, 1694076839),
                  new l.init(1203062813, 3204075428),
                ]);
              },
              _doFinalize: function () {
                var a = p._doFinalize.call(this);
                return (a.sigBytes -= 16), a;
              },
            })),
          (o.SHA384 = p._createHelper(g)),
          (o.HmacSHA384 = p._createHmacHelper(g)),
          h.SHA384);
      },
      34: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          i(938),
          (function () {
            var a = o,
              r = a.lib.Hasher,
              i = a.x64,
              s = i.Word,
              l = i.WordArray,
              d = a.algo;
            function X64Word_create() {
              return s.create.apply(s, arguments);
            }
            var c = [
                X64Word_create(1116352408, 3609767458),
                X64Word_create(1899447441, 602891725),
                X64Word_create(3049323471, 3964484399),
                X64Word_create(3921009573, 2173295548),
                X64Word_create(961987163, 4081628472),
                X64Word_create(1508970993, 3053834265),
                X64Word_create(2453635748, 2937671579),
                X64Word_create(2870763221, 3664609560),
                X64Word_create(3624381080, 2734883394),
                X64Word_create(310598401, 1164996542),
                X64Word_create(607225278, 1323610764),
                X64Word_create(1426881987, 3590304994),
                X64Word_create(1925078388, 4068182383),
                X64Word_create(2162078206, 991336113),
                X64Word_create(2614888103, 633803317),
                X64Word_create(3248222580, 3479774868),
                X64Word_create(3835390401, 2666613458),
                X64Word_create(4022224774, 944711139),
                X64Word_create(264347078, 2341262773),
                X64Word_create(604807628, 2007800933),
                X64Word_create(770255983, 1495990901),
                X64Word_create(1249150122, 1856431235),
                X64Word_create(1555081692, 3175218132),
                X64Word_create(1996064986, 2198950837),
                X64Word_create(2554220882, 3999719339),
                X64Word_create(2821834349, 766784016),
                X64Word_create(2952996808, 2566594879),
                X64Word_create(3210313671, 3203337956),
                X64Word_create(3336571891, 1034457026),
                X64Word_create(3584528711, 2466948901),
                X64Word_create(113926993, 3758326383),
                X64Word_create(338241895, 168717936),
                X64Word_create(666307205, 1188179964),
                X64Word_create(773529912, 1546045734),
                X64Word_create(1294757372, 1522805485),
                X64Word_create(1396182291, 2643833823),
                X64Word_create(1695183700, 2343527390),
                X64Word_create(1986661051, 1014477480),
                X64Word_create(2177026350, 1206759142),
                X64Word_create(2456956037, 344077627),
                X64Word_create(2730485921, 1290863460),
                X64Word_create(2820302411, 3158454273),
                X64Word_create(3259730800, 3505952657),
                X64Word_create(3345764771, 106217008),
                X64Word_create(3516065817, 3606008344),
                X64Word_create(3600352804, 1432725776),
                X64Word_create(4094571909, 1467031594),
                X64Word_create(275423344, 851169720),
                X64Word_create(430227734, 3100823752),
                X64Word_create(506948616, 1363258195),
                X64Word_create(659060556, 3750685593),
                X64Word_create(883997877, 3785050280),
                X64Word_create(958139571, 3318307427),
                X64Word_create(1322822218, 3812723403),
                X64Word_create(1537002063, 2003034995),
                X64Word_create(1747873779, 3602036899),
                X64Word_create(1955562222, 1575990012),
                X64Word_create(2024104815, 1125592928),
                X64Word_create(2227730452, 2716904306),
                X64Word_create(2361852424, 442776044),
                X64Word_create(2428436474, 593698344),
                X64Word_create(2756734187, 3733110249),
                X64Word_create(3204031479, 2999351573),
                X64Word_create(3329325298, 3815920427),
                X64Word_create(3391569614, 3928383900),
                X64Word_create(3515267271, 566280711),
                X64Word_create(3940187606, 3454069534),
                X64Word_create(4118630271, 4000239992),
                X64Word_create(116418474, 1914138554),
                X64Word_create(174292421, 2731055270),
                X64Word_create(289380356, 3203993006),
                X64Word_create(460393269, 320620315),
                X64Word_create(685471733, 587496836),
                X64Word_create(852142971, 1086792851),
                X64Word_create(1017036298, 365543100),
                X64Word_create(1126000580, 2618297676),
                X64Word_create(1288033470, 3409855158),
                X64Word_create(1501505948, 4234509866),
                X64Word_create(1607167915, 987167468),
                X64Word_create(1816402316, 1246189591),
              ],
              p = [];
            !(function () {
              for (var a = 0; a < 80; a++) p[a] = X64Word_create();
            })();
            var g = (d.SHA512 = r.extend({
              _doReset: function () {
                this._hash = new l.init([
                  new s.init(1779033703, 4089235720),
                  new s.init(3144134277, 2227873595),
                  new s.init(1013904242, 4271175723),
                  new s.init(2773480762, 1595750129),
                  new s.init(1359893119, 2917565137),
                  new s.init(2600822924, 725511199),
                  new s.init(528734635, 4215389547),
                  new s.init(1541459225, 327033209),
                ]);
              },
              _doProcessBlock: function (a, r) {
                for (
                  var i = this._hash.words,
                    o = i[0],
                    s = i[1],
                    l = i[2],
                    d = i[3],
                    g = i[4],
                    h = i[5],
                    u = i[6],
                    f = i[7],
                    b = o.high,
                    m = o.low,
                    y = s.high,
                    w = s.low,
                    v = l.high,
                    x = l.low,
                    _ = d.high,
                    S = d.low,
                    k = g.high,
                    A = g.low,
                    T = h.high,
                    C = h.low,
                    I = u.high,
                    B = u.low,
                    D = f.high,
                    E = f.low,
                    z = b,
                    N = m,
                    O = y,
                    M = w,
                    U = v,
                    H = x,
                    L = _,
                    j = S,
                    P = k,
                    W = A,
                    R = T,
                    q = C,
                    J = I,
                    X = B,
                    G = D,
                    V = E,
                    K = 0;
                  K < 80;
                  K++
                ) {
                  var Y,
                    Z,
                    Q = p[K];
                  if (K < 16)
                    (Z = Q.high = 0 | a[r + 2 * K]),
                      (Y = Q.low = 0 | a[r + 2 * K + 1]);
                  else {
                    var $ = p[K - 15],
                      tt = $.high,
                      et = $.low,
                      nt =
                        ((tt >>> 1) | (et << 31)) ^
                        ((tt >>> 8) | (et << 24)) ^
                        (tt >>> 7),
                      at =
                        ((et >>> 1) | (tt << 31)) ^
                        ((et >>> 8) | (tt << 24)) ^
                        ((et >>> 7) | (tt << 25)),
                      rt = p[K - 2],
                      it = rt.high,
                      ot = rt.low,
                      st =
                        ((it >>> 19) | (ot << 13)) ^
                        ((it << 3) | (ot >>> 29)) ^
                        (it >>> 6),
                      lt =
                        ((ot >>> 19) | (it << 13)) ^
                        ((ot << 3) | (it >>> 29)) ^
                        ((ot >>> 6) | (it << 26)),
                      dt = p[K - 7],
                      ct = dt.high,
                      pt = dt.low,
                      gt = p[K - 16],
                      ht = gt.high,
                      ut = gt.low;
                    (Z =
                      (Z =
                        (Z =
                          nt + ct + ((Y = at + pt) >>> 0 < at >>> 0 ? 1 : 0)) +
                        st +
                        ((Y += lt) >>> 0 < lt >>> 0 ? 1 : 0)) +
                      ht +
                      ((Y += ut) >>> 0 < ut >>> 0 ? 1 : 0)),
                      (Q.high = Z),
                      (Q.low = Y);
                  }
                  var ft,
                    bt = (P & R) ^ (~P & J),
                    mt = (W & q) ^ (~W & X),
                    yt = (z & O) ^ (z & U) ^ (O & U),
                    wt = (N & M) ^ (N & H) ^ (M & H),
                    vt =
                      ((z >>> 28) | (N << 4)) ^
                      ((z << 30) | (N >>> 2)) ^
                      ((z << 25) | (N >>> 7)),
                    xt =
                      ((N >>> 28) | (z << 4)) ^
                      ((N << 30) | (z >>> 2)) ^
                      ((N << 25) | (z >>> 7)),
                    _t =
                      ((P >>> 14) | (W << 18)) ^
                      ((P >>> 18) | (W << 14)) ^
                      ((P << 23) | (W >>> 9)),
                    St =
                      ((W >>> 14) | (P << 18)) ^
                      ((W >>> 18) | (P << 14)) ^
                      ((W << 23) | (P >>> 9)),
                    kt = c[K],
                    At = kt.high,
                    Tt = kt.low,
                    Ct = G + _t + ((ft = V + St) >>> 0 < V >>> 0 ? 1 : 0),
                    It = xt + wt;
                  (G = J),
                    (V = X),
                    (J = R),
                    (X = q),
                    (R = P),
                    (q = W),
                    (P =
                      (L +
                        (Ct =
                          (Ct =
                            (Ct =
                              Ct + bt + ((ft += mt) >>> 0 < mt >>> 0 ? 1 : 0)) +
                            At +
                            ((ft += Tt) >>> 0 < Tt >>> 0 ? 1 : 0)) +
                          Z +
                          ((ft += Y) >>> 0 < Y >>> 0 ? 1 : 0)) +
                        ((W = (j + ft) | 0) >>> 0 < j >>> 0 ? 1 : 0)) |
                      0),
                    (L = U),
                    (j = H),
                    (U = O),
                    (H = M),
                    (O = z),
                    (M = N),
                    (z =
                      (Ct +
                        (vt + yt + (It >>> 0 < xt >>> 0 ? 1 : 0)) +
                        ((N = (ft + It) | 0) >>> 0 < ft >>> 0 ? 1 : 0)) |
                      0);
                }
                (m = o.low = m + N),
                  (o.high = b + z + (m >>> 0 < N >>> 0 ? 1 : 0)),
                  (w = s.low = w + M),
                  (s.high = y + O + (w >>> 0 < M >>> 0 ? 1 : 0)),
                  (x = l.low = x + H),
                  (l.high = v + U + (x >>> 0 < H >>> 0 ? 1 : 0)),
                  (S = d.low = S + j),
                  (d.high = _ + L + (S >>> 0 < j >>> 0 ? 1 : 0)),
                  (A = g.low = A + W),
                  (g.high = k + P + (A >>> 0 < W >>> 0 ? 1 : 0)),
                  (C = h.low = C + q),
                  (h.high = T + R + (C >>> 0 < q >>> 0 ? 1 : 0)),
                  (B = u.low = B + X),
                  (u.high = I + J + (B >>> 0 < X >>> 0 ? 1 : 0)),
                  (E = f.low = E + V),
                  (f.high = D + G + (E >>> 0 < V >>> 0 ? 1 : 0));
              },
              _doFinalize: function () {
                var a = this._data,
                  r = a.words,
                  i = 8 * this._nDataBytes,
                  o = 8 * a.sigBytes;
                return (
                  (r[o >>> 5] |= 128 << (24 - (o % 32))),
                  (r[30 + (((o + 128) >>> 10) << 5)] = Math.floor(
                    i / 4294967296
                  )),
                  (r[31 + (((o + 128) >>> 10) << 5)] = i),
                  (a.sigBytes = 4 * r.length),
                  this._process(),
                  this._hash.toX32()
                );
              },
              clone: function () {
                var a = r.clone.call(this);
                return (a._hash = this._hash.clone()), a;
              },
              blockSize: 32,
            }));
            (a.SHA512 = r._createHelper(g)),
              (a.HmacSHA512 = r._createHmacHelper(g));
          })(),
          o.SHA512);
      },
      253: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          i(269),
          i(214),
          i(888),
          i(109),
          (function () {
            var a = o,
              r = a.lib,
              i = r.WordArray,
              s = r.BlockCipher,
              l = a.algo,
              d = [
                57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59,
                51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31,
                23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29,
                21, 13, 5, 28, 20, 12, 4,
              ],
              c = [
                14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26,
                8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45,
                33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32,
              ],
              p = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
              g = [
                {
                  0: 8421888,
                  268435456: 32768,
                  536870912: 8421378,
                  805306368: 2,
                  1073741824: 512,
                  1342177280: 8421890,
                  1610612736: 8389122,
                  1879048192: 8388608,
                  2147483648: 514,
                  2415919104: 8389120,
                  2684354560: 33280,
                  2952790016: 8421376,
                  3221225472: 32770,
                  3489660928: 8388610,
                  3758096384: 0,
                  4026531840: 33282,
                  134217728: 0,
                  402653184: 8421890,
                  671088640: 33282,
                  939524096: 32768,
                  1207959552: 8421888,
                  1476395008: 512,
                  1744830464: 8421378,
                  2013265920: 2,
                  2281701376: 8389120,
                  2550136832: 33280,
                  2818572288: 8421376,
                  3087007744: 8389122,
                  3355443200: 8388610,
                  3623878656: 32770,
                  3892314112: 514,
                  4160749568: 8388608,
                  1: 32768,
                  268435457: 2,
                  536870913: 8421888,
                  805306369: 8388608,
                  1073741825: 8421378,
                  1342177281: 33280,
                  1610612737: 512,
                  1879048193: 8389122,
                  2147483649: 8421890,
                  2415919105: 8421376,
                  2684354561: 8388610,
                  2952790017: 33282,
                  3221225473: 514,
                  3489660929: 8389120,
                  3758096385: 32770,
                  4026531841: 0,
                  134217729: 8421890,
                  402653185: 8421376,
                  671088641: 8388608,
                  939524097: 512,
                  1207959553: 32768,
                  1476395009: 8388610,
                  1744830465: 2,
                  2013265921: 33282,
                  2281701377: 32770,
                  2550136833: 8389122,
                  2818572289: 514,
                  3087007745: 8421888,
                  3355443201: 8389120,
                  3623878657: 0,
                  3892314113: 33280,
                  4160749569: 8421378,
                },
                {
                  0: 1074282512,
                  16777216: 16384,
                  33554432: 524288,
                  50331648: 1074266128,
                  67108864: 1073741840,
                  83886080: 1074282496,
                  100663296: 1073758208,
                  117440512: 16,
                  134217728: 540672,
                  150994944: 1073758224,
                  167772160: 1073741824,
                  184549376: 540688,
                  201326592: 524304,
                  218103808: 0,
                  234881024: 16400,
                  251658240: 1074266112,
                  8388608: 1073758208,
                  25165824: 540688,
                  41943040: 16,
                  58720256: 1073758224,
                  75497472: 1074282512,
                  92274688: 1073741824,
                  109051904: 524288,
                  125829120: 1074266128,
                  142606336: 524304,
                  159383552: 0,
                  176160768: 16384,
                  192937984: 1074266112,
                  209715200: 1073741840,
                  226492416: 540672,
                  243269632: 1074282496,
                  260046848: 16400,
                  268435456: 0,
                  285212672: 1074266128,
                  301989888: 1073758224,
                  318767104: 1074282496,
                  335544320: 1074266112,
                  352321536: 16,
                  369098752: 540688,
                  385875968: 16384,
                  402653184: 16400,
                  419430400: 524288,
                  436207616: 524304,
                  452984832: 1073741840,
                  469762048: 540672,
                  486539264: 1073758208,
                  503316480: 1073741824,
                  520093696: 1074282512,
                  276824064: 540688,
                  293601280: 524288,
                  310378496: 1074266112,
                  327155712: 16384,
                  343932928: 1073758208,
                  360710144: 1074282512,
                  377487360: 16,
                  394264576: 1073741824,
                  411041792: 1074282496,
                  427819008: 1073741840,
                  444596224: 1073758224,
                  461373440: 524304,
                  478150656: 0,
                  494927872: 16400,
                  511705088: 1074266128,
                  528482304: 540672,
                },
                {
                  0: 260,
                  1048576: 0,
                  2097152: 67109120,
                  3145728: 65796,
                  4194304: 65540,
                  5242880: 67108868,
                  6291456: 67174660,
                  7340032: 67174400,
                  8388608: 67108864,
                  9437184: 67174656,
                  10485760: 65792,
                  11534336: 67174404,
                  12582912: 67109124,
                  13631488: 65536,
                  14680064: 4,
                  15728640: 256,
                  524288: 67174656,
                  1572864: 67174404,
                  2621440: 0,
                  3670016: 67109120,
                  4718592: 67108868,
                  5767168: 65536,
                  6815744: 65540,
                  7864320: 260,
                  8912896: 4,
                  9961472: 256,
                  11010048: 67174400,
                  12058624: 65796,
                  13107200: 65792,
                  14155776: 67109124,
                  15204352: 67174660,
                  16252928: 67108864,
                  16777216: 67174656,
                  17825792: 65540,
                  18874368: 65536,
                  19922944: 67109120,
                  20971520: 256,
                  22020096: 67174660,
                  23068672: 67108868,
                  24117248: 0,
                  25165824: 67109124,
                  26214400: 67108864,
                  27262976: 4,
                  28311552: 65792,
                  29360128: 67174400,
                  30408704: 260,
                  31457280: 65796,
                  32505856: 67174404,
                  17301504: 67108864,
                  18350080: 260,
                  19398656: 67174656,
                  20447232: 0,
                  21495808: 65540,
                  22544384: 67109120,
                  23592960: 256,
                  24641536: 67174404,
                  25690112: 65536,
                  26738688: 67174660,
                  27787264: 65796,
                  28835840: 67108868,
                  29884416: 67109124,
                  30932992: 67174400,
                  31981568: 4,
                  33030144: 65792,
                },
                {
                  0: 2151682048,
                  65536: 2147487808,
                  131072: 4198464,
                  196608: 2151677952,
                  262144: 0,
                  327680: 4198400,
                  393216: 2147483712,
                  458752: 4194368,
                  524288: 2147483648,
                  589824: 4194304,
                  655360: 64,
                  720896: 2147487744,
                  786432: 2151678016,
                  851968: 4160,
                  917504: 4096,
                  983040: 2151682112,
                  32768: 2147487808,
                  98304: 64,
                  163840: 2151678016,
                  229376: 2147487744,
                  294912: 4198400,
                  360448: 2151682112,
                  425984: 0,
                  491520: 2151677952,
                  557056: 4096,
                  622592: 2151682048,
                  688128: 4194304,
                  753664: 4160,
                  819200: 2147483648,
                  884736: 4194368,
                  950272: 4198464,
                  1015808: 2147483712,
                  1048576: 4194368,
                  1114112: 4198400,
                  1179648: 2147483712,
                  1245184: 0,
                  1310720: 4160,
                  1376256: 2151678016,
                  1441792: 2151682048,
                  1507328: 2147487808,
                  1572864: 2151682112,
                  1638400: 2147483648,
                  1703936: 2151677952,
                  1769472: 4198464,
                  1835008: 2147487744,
                  1900544: 4194304,
                  1966080: 64,
                  2031616: 4096,
                  1081344: 2151677952,
                  1146880: 2151682112,
                  1212416: 0,
                  1277952: 4198400,
                  1343488: 4194368,
                  1409024: 2147483648,
                  1474560: 2147487808,
                  1540096: 64,
                  1605632: 2147483712,
                  1671168: 4096,
                  1736704: 2147487744,
                  1802240: 2151678016,
                  1867776: 4160,
                  1933312: 2151682048,
                  1998848: 4194304,
                  2064384: 4198464,
                },
                {
                  0: 128,
                  4096: 17039360,
                  8192: 262144,
                  12288: 536870912,
                  16384: 537133184,
                  20480: 16777344,
                  24576: 553648256,
                  28672: 262272,
                  32768: 16777216,
                  36864: 537133056,
                  40960: 536871040,
                  45056: 553910400,
                  49152: 553910272,
                  53248: 0,
                  57344: 17039488,
                  61440: 553648128,
                  2048: 17039488,
                  6144: 553648256,
                  10240: 128,
                  14336: 17039360,
                  18432: 262144,
                  22528: 537133184,
                  26624: 553910272,
                  30720: 536870912,
                  34816: 537133056,
                  38912: 0,
                  43008: 553910400,
                  47104: 16777344,
                  51200: 536871040,
                  55296: 553648128,
                  59392: 16777216,
                  63488: 262272,
                  65536: 262144,
                  69632: 128,
                  73728: 536870912,
                  77824: 553648256,
                  81920: 16777344,
                  86016: 553910272,
                  90112: 537133184,
                  94208: 16777216,
                  98304: 553910400,
                  102400: 553648128,
                  106496: 17039360,
                  110592: 537133056,
                  114688: 262272,
                  118784: 536871040,
                  122880: 0,
                  126976: 17039488,
                  67584: 553648256,
                  71680: 16777216,
                  75776: 17039360,
                  79872: 537133184,
                  83968: 536870912,
                  88064: 17039488,
                  92160: 128,
                  96256: 553910272,
                  100352: 262272,
                  104448: 553910400,
                  108544: 0,
                  112640: 553648128,
                  116736: 16777344,
                  120832: 262144,
                  124928: 537133056,
                  129024: 536871040,
                },
                {
                  0: 268435464,
                  256: 8192,
                  512: 270532608,
                  768: 270540808,
                  1024: 268443648,
                  1280: 2097152,
                  1536: 2097160,
                  1792: 268435456,
                  2048: 0,
                  2304: 268443656,
                  2560: 2105344,
                  2816: 8,
                  3072: 270532616,
                  3328: 2105352,
                  3584: 8200,
                  3840: 270540800,
                  128: 270532608,
                  384: 270540808,
                  640: 8,
                  896: 2097152,
                  1152: 2105352,
                  1408: 268435464,
                  1664: 268443648,
                  1920: 8200,
                  2176: 2097160,
                  2432: 8192,
                  2688: 268443656,
                  2944: 270532616,
                  3200: 0,
                  3456: 270540800,
                  3712: 2105344,
                  3968: 268435456,
                  4096: 268443648,
                  4352: 270532616,
                  4608: 270540808,
                  4864: 8200,
                  5120: 2097152,
                  5376: 268435456,
                  5632: 268435464,
                  5888: 2105344,
                  6144: 2105352,
                  6400: 0,
                  6656: 8,
                  6912: 270532608,
                  7168: 8192,
                  7424: 268443656,
                  7680: 270540800,
                  7936: 2097160,
                  4224: 8,
                  4480: 2105344,
                  4736: 2097152,
                  4992: 268435464,
                  5248: 268443648,
                  5504: 8200,
                  5760: 270540808,
                  6016: 270532608,
                  6272: 270540800,
                  6528: 270532616,
                  6784: 8192,
                  7040: 2105352,
                  7296: 2097160,
                  7552: 0,
                  7808: 268435456,
                  8064: 268443656,
                },
                {
                  0: 1048576,
                  16: 33555457,
                  32: 1024,
                  48: 1049601,
                  64: 34604033,
                  80: 0,
                  96: 1,
                  112: 34603009,
                  128: 33555456,
                  144: 1048577,
                  160: 33554433,
                  176: 34604032,
                  192: 34603008,
                  208: 1025,
                  224: 1049600,
                  240: 33554432,
                  8: 34603009,
                  24: 0,
                  40: 33555457,
                  56: 34604032,
                  72: 1048576,
                  88: 33554433,
                  104: 33554432,
                  120: 1025,
                  136: 1049601,
                  152: 33555456,
                  168: 34603008,
                  184: 1048577,
                  200: 1024,
                  216: 34604033,
                  232: 1,
                  248: 1049600,
                  256: 33554432,
                  272: 1048576,
                  288: 33555457,
                  304: 34603009,
                  320: 1048577,
                  336: 33555456,
                  352: 34604032,
                  368: 1049601,
                  384: 1025,
                  400: 34604033,
                  416: 1049600,
                  432: 1,
                  448: 0,
                  464: 34603008,
                  480: 33554433,
                  496: 1024,
                  264: 1049600,
                  280: 33555457,
                  296: 34603009,
                  312: 1,
                  328: 33554432,
                  344: 1048576,
                  360: 1025,
                  376: 34604032,
                  392: 33554433,
                  408: 34603008,
                  424: 0,
                  440: 34604033,
                  456: 1049601,
                  472: 1024,
                  488: 33555456,
                  504: 1048577,
                },
                {
                  0: 134219808,
                  1: 131072,
                  2: 134217728,
                  3: 32,
                  4: 131104,
                  5: 134350880,
                  6: 134350848,
                  7: 2048,
                  8: 134348800,
                  9: 134219776,
                  10: 133120,
                  11: 134348832,
                  12: 2080,
                  13: 0,
                  14: 134217760,
                  15: 133152,
                  2147483648: 2048,
                  2147483649: 134350880,
                  2147483650: 134219808,
                  2147483651: 134217728,
                  2147483652: 134348800,
                  2147483653: 133120,
                  2147483654: 133152,
                  2147483655: 32,
                  2147483656: 134217760,
                  2147483657: 2080,
                  2147483658: 131104,
                  2147483659: 134350848,
                  2147483660: 0,
                  2147483661: 134348832,
                  2147483662: 134219776,
                  2147483663: 131072,
                  16: 133152,
                  17: 134350848,
                  18: 32,
                  19: 2048,
                  20: 134219776,
                  21: 134217760,
                  22: 134348832,
                  23: 131072,
                  24: 0,
                  25: 131104,
                  26: 134348800,
                  27: 134219808,
                  28: 134350880,
                  29: 133120,
                  30: 2080,
                  31: 134217728,
                  2147483664: 131072,
                  2147483665: 2048,
                  2147483666: 134348832,
                  2147483667: 133152,
                  2147483668: 32,
                  2147483669: 134348800,
                  2147483670: 134217728,
                  2147483671: 134219808,
                  2147483672: 134350880,
                  2147483673: 134217760,
                  2147483674: 134219776,
                  2147483675: 0,
                  2147483676: 133120,
                  2147483677: 2080,
                  2147483678: 131104,
                  2147483679: 134350848,
                },
              ],
              h = [
                4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504,
                2147483679,
              ],
              u = (l.DES = s.extend({
                _doReset: function () {
                  for (var a = this._key.words, r = [], i = 0; i < 56; i++) {
                    var o = d[i] - 1;
                    r[i] = (a[o >>> 5] >>> (31 - (o % 32))) & 1;
                  }
                  for (var s = (this._subKeys = []), l = 0; l < 16; l++) {
                    var g = (s[l] = []),
                      h = p[l];
                    for (i = 0; i < 24; i++)
                      (g[(i / 6) | 0] |=
                        r[(c[i] - 1 + h) % 28] << (31 - (i % 6))),
                        (g[4 + ((i / 6) | 0)] |=
                          r[28 + ((c[i + 24] - 1 + h) % 28)] << (31 - (i % 6)));
                    for (g[0] = (g[0] << 1) | (g[0] >>> 31), i = 1; i < 7; i++)
                      g[i] = g[i] >>> (4 * (i - 1) + 3);
                    g[7] = (g[7] << 5) | (g[7] >>> 27);
                  }
                  var u = (this._invSubKeys = []);
                  for (i = 0; i < 16; i++) u[i] = s[15 - i];
                },
                encryptBlock: function (a, r) {
                  this._doCryptBlock(a, r, this._subKeys);
                },
                decryptBlock: function (a, r) {
                  this._doCryptBlock(a, r, this._invSubKeys);
                },
                _doCryptBlock: function (a, r, i) {
                  (this._lBlock = a[r]),
                    (this._rBlock = a[r + 1]),
                    exchangeLR.call(this, 4, 252645135),
                    exchangeLR.call(this, 16, 65535),
                    exchangeRL.call(this, 2, 858993459),
                    exchangeRL.call(this, 8, 16711935),
                    exchangeLR.call(this, 1, 1431655765);
                  for (var o = 0; o < 16; o++) {
                    for (
                      var s = i[o],
                        l = this._lBlock,
                        d = this._rBlock,
                        c = 0,
                        p = 0;
                      p < 8;
                      p++
                    )
                      c |= g[p][((d ^ s[p]) & h[p]) >>> 0];
                    (this._lBlock = d), (this._rBlock = l ^ c);
                  }
                  var u = this._lBlock;
                  (this._lBlock = this._rBlock),
                    (this._rBlock = u),
                    exchangeLR.call(this, 1, 1431655765),
                    exchangeRL.call(this, 8, 16711935),
                    exchangeRL.call(this, 2, 858993459),
                    exchangeLR.call(this, 16, 65535),
                    exchangeLR.call(this, 4, 252645135),
                    (a[r] = this._lBlock),
                    (a[r + 1] = this._rBlock);
                },
                keySize: 2,
                ivSize: 2,
                blockSize: 2,
              }));
            function exchangeLR(a, r) {
              var i = ((this._lBlock >>> a) ^ this._rBlock) & r;
              (this._rBlock ^= i), (this._lBlock ^= i << a);
            }
            function exchangeRL(a, r) {
              var i = ((this._rBlock >>> a) ^ this._lBlock) & r;
              (this._lBlock ^= i), (this._rBlock ^= i << a);
            }
            a.DES = s._createHelper(u);
            var f = (l.TripleDES = s.extend({
              _doReset: function () {
                var a = this._key.words;
                if (2 !== a.length && 4 !== a.length && a.length < 6)
                  throw new Error(
                    "Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192."
                  );
                var r = a.slice(0, 2),
                  o = a.length < 4 ? a.slice(0, 2) : a.slice(2, 4),
                  s = a.length < 6 ? a.slice(0, 2) : a.slice(4, 6);
                (this._des1 = u.createEncryptor(i.create(r))),
                  (this._des2 = u.createEncryptor(i.create(o))),
                  (this._des3 = u.createEncryptor(i.create(s)));
              },
              encryptBlock: function (a, r) {
                this._des1.encryptBlock(a, r),
                  this._des2.decryptBlock(a, r),
                  this._des3.encryptBlock(a, r);
              },
              decryptBlock: function (a, r) {
                this._des3.decryptBlock(a, r),
                  this._des2.encryptBlock(a, r),
                  this._des1.decryptBlock(a, r);
              },
              keySize: 6,
              ivSize: 2,
              blockSize: 2,
            }));
            a.TripleDES = s._createHelper(f);
          })(),
          o.TripleDES);
      },
      938: function (a, r, i) {
        var o;
        a.exports =
          ((o = i(249)),
          (function (a) {
            var r = o,
              i = r.lib,
              s = i.Base,
              l = i.WordArray,
              d = (r.x64 = {});
            (d.Word = s.extend({
              init: function (a, r) {
                (this.high = a), (this.low = r);
              },
            })),
              (d.WordArray = s.extend({
                init: function (r, i) {
                  (r = this.words = r || []),
                    (this.sigBytes = i != a ? i : 8 * r.length);
                },
                toX32: function () {
                  for (
                    var a = this.words, r = a.length, i = [], o = 0;
                    o < r;
                    o++
                  ) {
                    var s = a[o];
                    i.push(s.high), i.push(s.low);
                  }
                  return l.create(i, this.sigBytes);
                },
                clone: function () {
                  for (
                    var a = s.clone.call(this),
                      r = (a.words = this.words.slice(0)),
                      i = r.length,
                      o = 0;
                    o < i;
                    o++
                  )
                    r[o] = r[o].clone();
                  return a;
                },
              }));
          })(),
          o);
      },
      194: (a, r, i) => {
        var o;
        i.amdD,
          void 0 ===
            (o = function () {
              var a = -4,
                _encode = function (a) {
                  return "string" != typeof a
                    ? a
                    : a.replace(/[\+ \|\^\%]/g, function (a) {
                        return {
                          " ": "+",
                          "+": "%2B",
                          "|": "%7C",
                          "^": "%5E",
                          "%": "%25",
                        }[a];
                      });
                },
                _decode = function (a) {
                  return "string" != typeof a
                    ? a
                    : a.replace(/\+|%2B|%7C|%5E|%25/g, function (a) {
                        return {
                          "+": " ",
                          "%2B": "+",
                          "%7C": "|",
                          "%5E": "^",
                          "%25": "%",
                        }[a];
                      });
                },
                _base10To36 = function (a) {
                  return Number.prototype.toString.call(a, 36).toUpperCase();
                },
                _base36To10 = function (a) {
                  return parseInt(a, 36);
                },
                r =
                  Array.prototype.indexOf ||
                  function (a, r) {
                    for (var i = r || 0, o = this.length; i < o; i++)
                      if (this[i] === a) return i;
                    return -1;
                  };
              return {
                JSON,
                pack: function (i, o) {
                  var s = (o = o || {}).verbose || !1;
                  s && console.log("Normalize the JSON Object"),
                    (i = "string" == typeof i ? this.JSON.parse(i) : i),
                    s && console.log("Creating a empty dictionary");
                  var l = { strings: [], integers: [], floats: [] };
                  s && console.log("Creating the AST");
                  var d = (function recursiveAstBuilder(i) {
                      s &&
                        console.log(
                          "Calling recursiveAstBuilder with " +
                            this.JSON.stringify(i)
                        );
                      var o,
                        d = typeof i;
                      if (null === i) return { type: "null", index: -3 };
                      if (void 0 === i) return { type: "undefined", index: -5 };
                      if (i instanceof Array) {
                        var c = ["@"];
                        for (var p in i)
                          i.hasOwnProperty(p) &&
                            c.push(recursiveAstBuilder(i[p]));
                        return c;
                      }
                      if ("object" === d) {
                        for (var g in ((c = ["$"]), i))
                          i.hasOwnProperty(g) &&
                            (c.push(recursiveAstBuilder(g)),
                            c.push(recursiveAstBuilder(i[g])));
                        return c;
                      }
                      if ("" === i) return { type: "empty", index: a };
                      if ("string" === d)
                        return (
                          -1 == (o = r.call(l.strings, i)) &&
                            (l.strings.push(_encode(i)),
                            (o = l.strings.length - 1)),
                          { type: "strings", index: o }
                        );
                      if ("number" === d && i % 1 == 0)
                        return (
                          -1 == (o = r.call(l.integers, i)) &&
                            (l.integers.push(_base10To36(i)),
                            (o = l.integers.length - 1)),
                          { type: "integers", index: o }
                        );
                      if ("number" === d)
                        return (
                          -1 == (o = r.call(l.floats, i)) &&
                            (l.floats.push(i), (o = l.floats.length - 1)),
                          { type: "floats", index: o }
                        );
                      if ("boolean" === d)
                        return { type: "boolean", index: i ? -1 : -2 };
                      throw new Error(
                        "Unexpected argument of type " + typeof i
                      );
                    })(i),
                    c = l.strings.length,
                    p = l.integers.length;
                  l.floats.length, s && console.log("Parsing the dictionary");
                  var g = l.strings.join("|");
                  return (
                    (g += "^" + l.integers.join("|")),
                    (g += "^" + l.floats.join("|")),
                    s && console.log("Parsing the structure"),
                    (g +=
                      "^" +
                      (function recursiveParser(r) {
                        if (
                          (s &&
                            console.log(
                              "Calling a recursiveParser with " +
                                this.JSON.stringify(r)
                            ),
                          r instanceof Array)
                        ) {
                          var i = r.shift();
                          for (var o in r)
                            r.hasOwnProperty(o) &&
                              (i += recursiveParser(r[o]) + "|");
                          return (
                            ("|" === i[i.length - 1] ? i.slice(0, -1) : i) + "]"
                          );
                        }
                        var l = r.type,
                          d = r.index;
                        if ("strings" === l) return _base10To36(d);
                        if ("integers" === l) return _base10To36(c + d);
                        if ("floats" === l) return _base10To36(c + p + d);
                        if ("boolean" === l) return r.index;
                        if ("null" === l) return -3;
                        if ("undefined" === l) return -5;
                        if ("empty" === l) return a;
                        throw new TypeError("The item is alien!");
                      })(d)),
                    s && console.log("Ending parser"),
                    o.debug ? { dictionary: l, ast: d, packed: g } : g
                  );
                },
                unpack: function (r, i) {
                  i = i || {};
                  var o = r.split("^");
                  i.verbose && console.log("Building dictionary");
                  var s = [],
                    l = o[0];
                  if ("" !== l) {
                    (l = l.split("|")),
                      i.verbose && console.log("Parse the strings dictionary");
                    for (var d = 0, c = l.length; d < c; d++)
                      s.push(_decode(l[d]));
                  }
                  if ("" !== (l = o[1]))
                    for (
                      l = l.split("|"),
                        i.verbose &&
                          console.log("Parse the integers dictionary"),
                        d = 0,
                        c = l.length;
                      d < c;
                      d++
                    )
                      s.push(_base36To10(l[d]));
                  if ("" !== (l = o[2]))
                    for (
                      l = l.split("|"),
                        i.verbose && console.log("Parse the floats dictionary"),
                        d = 0,
                        c = l.length;
                      d < c;
                      d++
                    )
                      s.push(parseFloat(l[d]));
                  (l = null),
                    i.verbose && console.log("Tokenizing the structure");
                  var p = "",
                    g = [],
                    h = o[3].length;
                  for (d = 0; d < h; d++) {
                    var u = o[3].charAt(d);
                    "|" === u || "$" === u || "@" === u || "]" === u
                      ? (p && (g.push(_base36To10(p)), (p = "")),
                        "|" !== u && g.push(u))
                      : (p += u);
                  }
                  var f = g.length,
                    b = 0;
                  return (
                    i.verbose && console.log("Starting recursive parser"),
                    (function recursiveUnpackerParser() {
                      var r = g[b++];
                      if (
                        (i.verbose &&
                          console.log(
                            "Reading collection type " +
                              ("$" === r ? "object" : "Array")
                          ),
                        "@" === r)
                      ) {
                        for (var o = []; b < f; b++) {
                          var l = g[b];
                          if (
                            (i.verbose && console.log("Read " + l + " symbol"),
                            "]" === l)
                          )
                            return o;
                          if ("@" === l || "$" === l)
                            o.push(recursiveUnpackerParser());
                          else
                            switch (l) {
                              case -1:
                                o.push(!0);
                                break;
                              case -2:
                                o.push(!1);
                                break;
                              case -3:
                                o.push(null);
                                break;
                              case -5:
                                o.push(void 0);
                                break;
                              case a:
                                o.push("");
                                break;
                              default:
                                o.push(s[l]);
                            }
                        }
                        return (
                          i.verbose &&
                            console.log("Parsed " + this.JSON.stringify(o)),
                          o
                        );
                      }
                      if ("$" === r) {
                        for (o = {}; b < f; b++) {
                          var d = g[b];
                          if ("]" === d) return o;
                          if (
                            ((d = d === a ? "" : s[d]),
                            "@" === (l = g[++b]) || "$" === l)
                          )
                            o[d] = recursiveUnpackerParser();
                          else
                            switch (l) {
                              case -1:
                                o[d] = !0;
                                break;
                              case -2:
                                o[d] = !1;
                                break;
                              case -3:
                                o[d] = null;
                                break;
                              case -5:
                                o[d] = void 0;
                                break;
                              case a:
                                o[d] = "";
                                break;
                              default:
                                o[d] = s[l];
                            }
                        }
                        return (
                          i.verbose &&
                            console.log("Parsed " + this.JSON.stringify(o)),
                          o
                        );
                      }
                      throw new TypeError("Bad token " + r + " isn't a type");
                    })()
                  );
                },
              };
            }.apply(r, [])) || (a.exports = o);
      },
      480: () => {},
    },
    r = {};
  function __webpack_require__(i) {
    var o = r[i];
    if (void 0 !== o) return o.exports;
    var s = (r[i] = { exports: {} });
    return a[i].call(s.exports, s, s.exports, __webpack_require__), s.exports;
  }
  (__webpack_require__.amdD = function () {
    throw new Error("define cannot be used indirect");
  }),
    (__webpack_require__.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (a) {
        if ("object" == typeof window) return window;
      }
    })()),
    (() => {
      "use strict";
      var a = __webpack_require__(354);
      const r = "Thanh71311@";
      class i {
        encrypt(i = "", o = r) {
          const s = a.SHA256(o);
          return {
            data: a.AES.encrypt(i, s, {
              mode: a.mode.ECB,
              padding: a.pad.Pkcs7,
            }).toString(),
          };
        }
        decrypt(i = "", o = r) {
          const s = a.SHA256(o);
          return {
            data: a.AES.decrypt(i, s, {
              mode: a.mode.ECB,
              padding: a.pad.Pkcs7,
            }).toString(a.enc.Utf8),
          };
        }
      }
      const getThongBaoTemplate = (a, r) =>
        `\n<div style="Margin:0;background:#fff!important;box-sizing:border-box;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;min-width:100%;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;width:100%!important">\n  <span style="color:#f7f7f7;display:none!important;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden">\n    ${r}\n    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr>&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr>&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr>&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr>&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr>&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;<wbr>&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;\n  </span>\n  <table class="m_-5139993502652391431body" style="Margin:0;background:#fff!important;border-collapse:collapse;border-spacing:0;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;height:100%;line-height:26px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n    <tbody><tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n      <td align="center" style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:center;vertical-align:top;word-wrap:break-word" valign="top">\n        <center style="min-width:600px;width:100%">\n\n\n              <table align="center" style="Margin:0 auto;background-color:#ffffff;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:center;vertical-align:top;width:100%">\n    <tbody>\n        <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n            <td style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n\n                <table align="center" class="m_-5139993502652391431container" style="Margin:0 auto;background:0 0!important;border-collapse:collapse;border-spacing:0;margin:0 auto;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:inherit;vertical-align:top;width:600px">\n                    <tbody>\n                        <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                            <td style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n                                <table style="border-collapse:collapse;border-spacing:0;display:table;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n                                    <tbody>\n                                        <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                                            <th class="m_-5139993502652391431small-12 m_-5139993502652391431columns m_-5139993502652391431first" style="Margin:0 auto;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0 auto;padding-bottom:16px;padding-left:24px;padding-right:12px;padding-top:0;text-align:left;vertical-align:top;width:76px;word-wrap:break-word">\n                                                <table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n                                                    <tbody>\n                                                        <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                                                            <th style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n                                                            </th>\n                                                        </tr>\n                                                    </tbody>\n                                                </table>\n                                            </th>\n                                            <th class="m_-5139993502652391431small-12 m_-5139993502652391431columns" style="Margin:0 auto;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0 auto;padding-bottom:16px;padding-left:12px;padding-right:12px;padding-top:0;text-align:left;vertical-align:top;width:376px;word-wrap:break-word">\n                                                <table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n                                                    <tbody>\n                                                        <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                                                            <th style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n                                                                <table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n                                                                    <tbody>\n                                                                        <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                                                                            <td height="20" style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:400;line-height:20px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n                                                                                &nbsp;</td>\n                                                                        </tr>\n                                                                    </tbody>\n                                                                </table>\n\n\n                                                                <table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n                                                                    <tbody>\n                                                                        <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                                                                            <td height="15" style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:400;line-height:15px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n                                                                                &nbsp;</td>\n                                                                        </tr>\n                                                                    </tbody>\n                                                                </table>\n\n\n                                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%" width="100%">\n    <tbody><tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n        <td align="center" style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n            <div style="text-align:center">\n\n                <a  style="direction:ltr!important;background-color:#1cb0f6;border:1px solid #1cb0f6;border-radius:9px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:16px;font-weight:700;letter-spacing:.5px;line-height:42px;padding:0;text-align:center;text-decoration:none;width:260px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.duolingo.com/course/en/vi?email_type%3Dpractice_reminder%26email%3Dc42aa594676242052a31968463e8ff5ca568999bIms0MGNudHRAZ21haWwuY29tIg%3D%3D%26target%3Dcta%26utm_content%3Dcta%26utm_source%3Dcomeback%26utm_medium%3Demail%26utm_campaign%3Dpractice_reminder&amp;source=gmail&amp;ust=1684733701432000&amp;usg=AOvVaw2zVrkVYLk-sdOl0U74wOUh">\n                    THÔNG BÁO</a>\n            </div>\n        </td>\n    </tr>\n</tbody></table>\n                                                                    <table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n                                                                        <tbody>\n                                                                            <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                                                                                <td height="15" style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:400;line-height:15px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n                                                                                    &nbsp;</td>\n                                                                            </tr>\n                                                                        </tbody>\n                                                                    </table>\n\n                                                                    <center style="width:100%;max-width:300px;margin:0 auto">\n\n      <div  class="logo" style="margin: 0 auto; width: 100%;height: 100px;background-image: linear-gradient(\n    to right,\n    oklch(70.5% 0.111 0),\n    oklch(70.5% 0.111 30),\n    oklch(70.5% 0.111 60),\n    oklch(70.5% 0.111 90),\n    oklch(70.5% 0.111 120),\n    oklch(70.5% 0.111 150),\n    oklch(70.5% 0.111 180),\n    oklch(70.5% 0.111 210),\n    oklch(70.5% 0.111 240),\n    oklch(70.5% 0.111 270),\n    oklch(70.5% 0.111 300),\n    oklch(70.5% 0.111 330),\n    oklch(70.5% 0.111 360)\n  );background-size: 100vmin 100vmin;-webkit-mask: url(https://lh3.googleusercontent.com/drive-viewer/AFGJ81owew_goxre6gyaWnEZDQd7R5gXoJs53wkUg1Jv69Iba4d0osKW1wYAoCstYzbEh3HgBifvXvrNMmrWt8b1TwlHZnTaAg=s2560);-webkit-mask-size: contain;-webkit-mask-repeat: no-repeat;animation: rainbow 2s linear infinite;"></div>\n        <img align="center" alt="Duo waving hello" height="170" src="https://ci5.googleusercontent.com/proxy/VkLRg4fPBpFBUXda1JM6CGMBKtfBwc9hyGMfOVH91qgUfIwzYfnIdX2bpqC7VcvPI1Hzs0g5_FhrY91umpzFiv9PZf8Xk2bMoEQThpnE7RT1nH8B0LId0SV1BJhPLHSt8UbuqdRFnOFWzoCByx50DUtPZO4QxRrF=s0-d-e1-ft#https://d2h7jmc5kw17oy.cloudfront.net/images/notification-images/revamp-march-2021-feature-header.gif" style="Margin:0 auto;clear:both;display:block;float:none;margin:0 auto;max-width:100%;outline:0;text-align:center;text-decoration:none" width="auto" class="CToWUd" data-bit="iit">\n</center>\n                                                                    <table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n                                                                        <tbody>\n                                                                            <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                                                                                <td height="15" style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:400;line-height:15px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n                                                                                    &nbsp;</td>\n                                                                            </tr>\n                                                                        </tbody>\n                                                                    </table>\n\n                                                                    <h1 style="direction:ltr!important;Margin:0;Margin-bottom:10px;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:24px;font-weight:700;line-height:1.2;margin:0;margin-bottom:10px;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:center;word-wrap:normal">\n    ${a}</h1><p style="direction:ltr!important;Margin:0;Margin-bottom:10px;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;margin-bottom:10px;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:center">\n    ${r}</p>\n                                                                    <table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n                                                                        <tbody>\n                                                                            <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                                                                                <td height="15" style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:400;line-height:15px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n                                                                                    &nbsp;</td>\n                                                                            </tr>\n                                                                        </tbody>\n                                                                    </table>\n\n                                                            </th>\n                                                        </tr>\n                                                    </tbody>\n                                                </table>\n                                            </th>\n                                            <th class="m_-5139993502652391431small-12 m_-5139993502652391431columns m_-5139993502652391431last" style="Margin:0 auto;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0 auto;padding-bottom:16px;padding-left:12px;padding-right:24px;padding-top:0;text-align:left;vertical-align:top;width:76px;word-wrap:break-word">\n                                                <table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n                                                    <tbody>\n                                                        <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                                                            <th style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n                                                            </th>\n                                                        </tr>\n                                                    </tbody>\n                                                </table>\n                                            </th>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n\n            </td>\n        </tr>\n    </tbody>\n</table>\n              <table align="center" style="Margin:0 auto;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:center;vertical-align:top;width:100%">\n                <tbody>\n                  <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                    <td height="15" style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:50px;font-weight:400;line-height:15px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n                      &nbsp;</td>\n                  </tr>\n                </tbody>\n              </table>\n\n              <table align="center" class="m_-5139993502652391431container" style="Margin:0 auto;background:#fff;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:center;vertical-align:top;width:600px">\n    <tbody>\n        <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n            <td style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n\n                    <table align="center" class="m_-5139993502652391431container" style="Margin:0 auto;background:#fff;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:center;vertical-align:top;width:600px">\n    <tbody>\n        <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n            <td style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n                <hr style="border-color:#f7f7f7!important;border-style:solid!important">\n            </td>\n        </tr>\n    </tbody>\n</table>\n\n                        <table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n                            <tbody>\n                                <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                                    <td height="30" style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:30px;font-weight:400;line-height:30px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n                                        &nbsp;</td>\n                                </tr>\n                            </tbody>\n                        </table>\n\n\n                    <table style="border-collapse:collapse;border-spacing:0;display:table;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n    <tbody>\n        <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n            <th class="m_-5139993502652391431small-12 m_-5139993502652391431columns m_-5139993502652391431first" style="Margin:0 auto;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0 auto;padding-bottom:16px;padding-left:24px;padding-right:12px;padding-top:0;text-align:left;vertical-align:top;width:26px;word-wrap:break-word">\n                <table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n                    <tbody>\n                        <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                            <th style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n                            </th>\n                        </tr>\n                    </tbody>\n                </table>\n            </th>\n            <th class="m_-5139993502652391431small-12 m_-5139993502652391431columns" style="Margin:0 auto;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0 auto;padding-bottom:16px;padding-left:12px;padding-right:12px;padding-top:0;text-align:left;vertical-align:top;width:476px;word-wrap:break-word">\n                <table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n                    <tbody>\n                        <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                            <th style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n\n\n\n\n\n\n                            </th>\n                        </tr>\n                    </tbody>\n                </table>\n            </th>\n            <th class="m_-5139993502652391431small-12 m_-5139993502652391431columns m_-5139993502652391431last" style="Margin:0 auto;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0 auto;padding-bottom:16px;padding-left:12px;padding-right:24px;padding-top:0;text-align:left;vertical-align:top;width:26px;word-wrap:break-word">\n                <table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n                    <tbody>\n                        <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                            <th style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n                            </th>\n                        </tr>\n                    </tbody>\n                </table>\n            </th>\n        </tr>\n    </tbody>\n</table>\n\n\n            </td>\n        </tr>\n    </tbody>\n</table>\n\n\n              <table align="center" class="m_-5139993502652391431container" style="Margin:0 auto;background:#fff;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:center;vertical-align:top;width:600px">\n    <tbody>\n        <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n            <td style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n                <hr style="border-color:#f7f7f7!important;border-style:solid!important">\n            </td>\n        </tr>\n    </tbody>\n</table>\n              <table align="center" style="Margin:0 auto;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:center;vertical-align:top;width:100%">\n                <tbody>\n                  <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                    <td height="15" style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:50px;font-weight:400;line-height:15px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n                      &nbsp;</td>\n                  </tr>\n                </tbody>\n              </table>\n\n\n          <table align="center" class="m_-5139993502652391431container" style="Margin:0 auto;background:#fff;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:center;vertical-align:top;width:600px">\n            <tbody>\n              <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                <td style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n                  <table style="border-collapse:collapse;border-spacing:0;display:table;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n                    <tbody>\n                      <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                        <th class="m_-5139993502652391431small-10 m_-5139993502652391431columns m_-5139993502652391431first" style="Margin:0 auto;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0 auto;padding-bottom:16px;padding-left:24px;padding-right:12px;padding-top:0;text-align:left;vertical-align:top;width:326px;word-wrap:break-word">\n                          <table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n                            <tbody>\n                              <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                                <th style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n\n                                </th>\n                              </tr>\n                            </tbody>\n                          </table>\n                        </th>\n                        <th class="m_-5139993502652391431small-10 m_-5139993502652391431columns m_-5139993502652391431last" style="Margin:0 auto;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0 auto;padding-bottom:16px;padding-left:12px;padding-right:24px;padding-top:0;text-align:left;vertical-align:top;width:176px;word-wrap:break-word">\n                          <table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n                            <tbody>\n                              <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                                <th style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n                                  <table align="left" cellpadding="8" style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:150px!important">\n                                    <tbody>\n                                      <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                                        <td style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word" width="39">\n                                          <a  style="color:#afafaf;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:400;line-height:19px;padding:0;text-align:left;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.instagram.com/duolingo&amp;source=gmail&amp;ust=1684733701432000&amp;usg=AOvVaw1d0RQel5OqvvQz7EIEew1l"><img alt="Instagram" height="23" src="https://ci4.googleusercontent.com/proxy/ZmtVJH3fyXXMb9b9csI4zI22DZP0e3EEK4grNCPIJmAJ8P6ha3oMjmUd4WZSDtta6HltATLuHVuDRiaPFxZXDcb93v5MFsI_Kg=s0-d-e1-ft#http://dzvpwvcpo1876.cloudfront.net/Instagram_dark.png" style="border:0;clear:both;display:inline-block;height:23px;max-width:100%;outline:0;text-decoration:none;width:23px" width="23" class="CToWUd" data-bit="iit"></a>\n                                        </td>\n                                        <td style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word" width="39">\n                                          <a  style="color:#afafaf;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:400;line-height:19px;padding:0;text-align:left;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/duolingo&amp;source=gmail&amp;ust=1684733701433000&amp;usg=AOvVaw3tCx4wjE1QQ5G-C9PSZTXD"><img alt="Twitter" height="23" src="https://ci5.googleusercontent.com/proxy/jLZSccWIQtL0JX_OYHVUVm4H7f-V1q2TqxA2_qxbpdZpZc4xpjmFQubTMKG6YmaMeZ5jCVtQak4Ep7MzJ3eGWlLP6LkSc_M=s0-d-e1-ft#http://dzvpwvcpo1876.cloudfront.net/Twitter_dark.png" style="border:0;clear:both;display:inline-block;height:23px;max-width:100%;outline:0;text-decoration:none;width:23px" width="23" class="CToWUd" data-bit="iit"></a>\n                                        </td>\n                                        <td style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word" width="39">\n                                          <a style="color:#afafaf;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:400;line-height:19px;padding:0;text-align:left;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/duolingo&amp;source=gmail&amp;ust=1684733701433000&amp;usg=AOvVaw0A6yN2nCl3PEZsfYjL0Pn3"><img alt="Facebook" height="23" src="https://ci6.googleusercontent.com/proxy/stBlHVAmCliFZ-6l8ELoi_8BER9gC4dYnXeP0uoVMSDwfdK9mRbCbSgzhQSABZIjEVrezrOTAWU-3x0rQqCfY2kucFFLCGPr=s0-d-e1-ft#http://dzvpwvcpo1876.cloudfront.net/Facebook_dark.png" style="border:0;clear:both;display:inline-block;height:23px;max-width:100%;outline:0;text-decoration:none;width:23px" width="23" class="CToWUd" data-bit="iit"></a>\n                                        </td>\n                                        <td style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word" width="39">\n                                          <a  style="color:#afafaf;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:400;line-height:19px;padding:0;text-align:left;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.tiktok.com/@duolingo&amp;source=gmail&amp;ust=1684733701433000&amp;usg=AOvVaw07pXAsk0qKBnLuWqMCynAX"><img alt="TikTok" height="23" src="https://ci4.googleusercontent.com/proxy/p4i3V9gS-lPrU1FyGSVzJ9pn08CiOTeYmFMN4aCmxLCJcSMnVNQrXtWWUp7GILmRQy6S2B2QVruiwtQHuNlhkb-Vk5AckeMFU3XBlfP_0N4=s0-d-e1-ft#http://dzvpwvcpo1876.cloudfront.net/social-icon-tiktok-2x.png" style="border:0;clear:both;display:inline-block;height:23px;max-width:100%;outline:0;text-decoration:none;width:23px" width="23" class="CToWUd" data-bit="iit"></a>\n                                        </td>\n                                      </tr>\n                                    </tbody>\n                                  </table>\n                                </th>\n                              </tr>\n                            </tbody>\n                          </table>\n                        </th>\n                      </tr>\n                    </tbody>\n                  </table>\n                  <table style="border-collapse:collapse;border-spacing:0;display:table;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n                    <tbody>\n                      <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                        <th class="m_-5139993502652391431small-10 m_-5139993502652391431columns m_-5139993502652391431first m_-5139993502652391431last" style="Margin:0 auto;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0 auto;padding-bottom:16px;padding-left:24px;padding-right:24px;padding-top:0;text-align:left;vertical-align:top;width:576px;word-wrap:break-word">\n                          <table style="border-collapse:collapse;border-spacing:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:100%">\n                            <tbody>\n                              <tr style="padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top">\n                                <th style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;word-wrap:break-word">\n                                  <p style="Margin:0;margin:0;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:19px;font-weight:400;color:#afafaf">Phần mềm quản lý phòng khám thú y VetGo</p>\n                                  <p style="direction:ltr!important;Margin:0;Margin-bottom:10px;color:#afafaf;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:400;line-height:19px;margin:0;margin-bottom:10px;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left">\n\n                                    Đây là email tự động Vui lòng không trả lời. <br>\n                                  </p>\n                                </th>\n                                <th style="Margin:0;border-collapse:collapse!important;color:#4b4b4b;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;margin:0;padding:0!important;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;text-align:left;vertical-align:top;width:0;word-wrap:break-word">\n                                </th>\n                              </tr>\n                            </tbody>\n                          </table>\n                        </th>\n                      </tr>\n                    </tbody>\n                  </table>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </center>\n      </td>\n    </tr>\n  </tbody></table><div class="yj6qo"></div><div class="adL">\n\n  </div><div style="display:none;white-space:nowrap;font:15px courier;line-height:0" class="adL"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;\n    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;\n    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div><div class="adL">\n\n\n</div>\n</div>\n `;
      class o {
        sendEmail(a = "", r = "", i = "") {
          return (
            GmailApp.sendEmail(a, r, "", { htmlBody: i }), { status: "SUCCESS" }
          );
        }
        sendEmailThongBao(a = "", r = "", i = "") {
          return (
            GmailApp.sendEmail(i, a, a, {
              htmlBody: getThongBaoTemplate(a, r),
            }),
            { status: "SUCCESS" }
          );
        }
        sendOtp(a) {
          const { recipient: r, bytes: i } = a.data;
          var o;
          return (
            GmailApp.sendEmail(r, "[VetGo] Mã xác minh", "", {
              htmlBody:
                ((o = this.decodeOtp(i)),
                `\n  <div>\n  <div></div>\n  <div style="word-spacing: normal; background-color: #efefef;">\n    <div></div>\n    <div style="background-color: #efefef;">\n      <div></div>\n      <div style="margin: 0px auto; max-width: 600px;">\n        <div></div>\n        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">\n          <tbody>\n            <tr>\n              <td style="direction: ltr; font-size: 0px; padding: 0 0 0 0; padding-bottom: 0; padding-left: 0; padding-right: 0; padding-top: 0; text-align: center;">\n                <div style="margin: 0px auto; max-width: 600px;">\n                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">\n                    <tbody>\n                      <tr>\n                        <td style="direction: ltr; font-size: 0px; padding: 0 0 0 0; padding-bottom: 0; padding-left: 0; padding-right: 0; padding-top: 0; text-align: center;">\n                          <div style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">\n                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="vertical-align: top;">\n                              <tbody>\n                                <tr>\n                                  <td align="center" style="font-size: 0px; padding: 0 0 0 0; padding-top: 0; padding-right: 0; padding-bottom: 0; padding-left: 0; word-break: break-word;">\n                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="min-width: 100%; max-width: 100%; width: 100px; border-collapse: collapse; border-spacing: 0px;">\n                                      <tbody>\n                                        <tr>\n                                          <td style="background-color: white; " align="center" >\n                                            <img height="auto" src="https://assets.vetgo.vn/content/spago/logo-spago.png" style="border: 0; display: block; outline: none; text-decoration: none; height: auto;  width: 180px; ; font-size: 13px;">\n                                          </td>\n                                        </tr>\n                                      </tbody>\n                                    </table>\n                                  </td>\n                                </tr>\n                              </tbody>\n                            </table>\n                          </div>\n                        </td>\n                      </tr>\n                    </tbody>\n                  </table>\n                </div>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n      <div style="background: #ffffff; background-color: #ffffff; margin: 0px auto; max-width: 600px;">\n        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: #ffffff; background-color: #ffffff; width: 100%;">\n          <tbody>\n            <tr>\n              <td style="direction: ltr; font-size: 0px; padding: 5px 5px 5px 5px; text-align: center;">\n                <div style="margin: 0px auto; max-width: 590px;">\n                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">\n                    <tbody>\n                      <tr>\n                        <td style="direction: ltr; font-size: 0px; padding: 5px 5px 5px 5px; text-align: center;">\n                          <div style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">\n                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="vertical-align: top;">\n                              <tbody>\n                                <tr>\n                                  <td align="left" style="font-size: 0px; padding: 5px 5px 10px 5px; padding-bottom: 10px; word-break: break-word;">\n                                    <div style="font-family: BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif; font-size: 20px; font-weight: 900; line-height: 25px; text-align: left; color: #000000;">[<span>VetGo</span>]  Mã xác minh </div>\n                                  </td>\n                                </tr>\n                                <tr>\n                                  <td align="left" style="font-size: 0px; padding: 5px 5px 5px 5px; word-break: break-word;">\n                                    <div style="font-family: BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif; font-size: 14px; line-height: 20px; text-align: left; color: #000000;">Mã xác minh của bạn:&nbsp; </div>\n                                  </td>\n                                </tr>\n                                <tr>\n                                  <td align="left" style="background: #ffffff; font-size: 0px; padding: 5px 5px 5px 5px; word-break: break-word;">\n                                    <div style="font-family: BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif; font-size: 18px; line-height: 30px; text-align: left; color: rgb(240,185,11);">\n                                      <div>\n                                        <span>\n                                          <span>\n                                            <b>${o}</b>\n                                          </span>\n                                        </span>\n                                      </div>\n                                    </div>\n                                  </td>\n                                </tr>\n                                <tr>\n                                  <td align="left" style="font-size: 0px; padding: 5px 5px 5px 5px; word-break: break-word;">\n                                    <div style="font-family: BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif; font-size: 14px; line-height: 20px; text-align: left; color: #000000;">\n                                      <span>\n                                        <span>Mã xác minh sẽ có hiệu lực trong 30 phút. Vui lòng không chia sẻ mã này với bất kỳ ai.&nbsp;</span>\n                                      </span>\n\n                                    </div>\n                                  </td>\n                                </tr>\n                                <tr>\n                                  <td align="left" style="font-size: 0px; padding: 5px 5px 5px 5px; word-break: break-word;">\n                                    <div style="font-family: BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif; font-size: 14px; line-height: 20px; text-align: left; color: #000000;">\n                                      <i>Đây là tin nhắn tự động, vui lòng không trả lời.&nbsp; </i>\n                                    </div>\n                                  </td>\n                                </tr>\n                              </tbody>\n                            </table>\n                          </div>\n                        </td>\n                      </tr>\n                    </tbody>\n                  </table>\n                </div>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n      <div style="background: #ffffff; background-color: #ffffff; margin: 0px auto; max-width: 600px;">\n        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: #ffffff; background-color: #ffffff; width: 100%;">\n          <tbody>\n            <tr>\n              <td style="border: 0 none rgb(0,0,0); direction: ltr; font-size: 0px; padding: 5px 5px 5px 5px; text-align: center;">\n                <div style="margin: 0px auto; max-width: 590px;">\n                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">\n                    <tbody>\n                      <tr>\n                        <td style="direction: ltr; font-size: 0px; padding: 5px 5px 5px 5px; text-align: center;">\n                          <div style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">\n                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="vertical-align: top;">\n                              <tbody>\n                                <tr>\n                                  <td align="center" style="font-size: 0px; padding: 5px 5px 5px 5px; word-break: break-word;">\n                                    <p style="border-top: solid 1px #f0b90b; font-size: 1px; margin: 0px auto; width: 100%;"></p>\n                                  </td>\n                                </tr>\n                                <tr>\n                                  <td align="center" style="font-size: 0px; padding: 5px 5px 5px 5px; word-break: break-word;">\n                                    <div style="font-family: BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif; font-size: 14px; font-weight: 900; line-height: 20px; text-align: center; color: #f0b90b;">\n                                      <span>Giữ liên lạc!</span>\n                                    </div>\n                                  </td>\n                                </tr>\n                                <tr>\n                                  <td style="font-size: 0px; word-break: break-word;">\n                                    <div style="font-size: 0; line-height: 0; text-align: left; display: inline-block; width: 100%; direction: ltr;">\n                                      <div style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">\n                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="vertical-align: top;">\n                                          <tbody>\n                                            <tr>\n                                              <td align="center" style="font-size: 0px; padding: 5px 5px 5px 5px; word-break: break-word;">\n                                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float: none; display: inline-table;">\n                                                  <tbody>\n                                                    <tr>\n                                                      <td style="padding: 4px; vertical-align: middle;">\n                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius: 3px; width: 20px;">\n                                                          <tbody>\n                                                            <tr>\n                                                              <td style="padding: 0px 5px; font-size: 0; height: 20px; vertical-align: middle; width: 20px;">\n                                                                <a href="https://www.vetgo.vn" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/binance&amp;source=gmail&amp;ust=1679901738881000&amp;usg=AOvVaw1xHsXrVwM3odUgcF0Yt97b">\n                                                                  <img height="20" src="https://ci6.googleusercontent.com/proxy/i6_VaF0YwcVX_aJGyTOdQcAoiGIJ_mtdJQgm675mrryBk89nw5L1n4IGp6-zyvdtnmx514a7q77HjvKPAZUNs8_TzAW1yho5wFRdDZM=s0-d-e1-ft#https://public.bnbstatic.com/image/social/twitter-dark.png" width="20" data-bit="iit" style="border-radius: 3px; display: block;">\n                                                                </a>\n                                                              </td>\n                                                            </tr>\n                                                          </tbody>\n                                                        </table>\n                                                      </td>\n                                                    </tr>\n                                                  </tbody>\n                                                </table>\n                                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float: none; display: inline-table;">\n                                                  <tbody>\n                                                    <tr>\n                                                      <td style="padding: 4px; vertical-align: middle;">\n                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius: 3px; width: 20px;">\n                                                          <tbody>\n                                                            <tr>\n                                                              <td style="padding: 0px 5px; font-size: 0; height: 20px; vertical-align: middle; width: 20px;">\n                                                                <a href="https://www.vetgo.vn/" target="_blank" >\n                                                                  <img height="20" src="https://ci4.googleusercontent.com/proxy/U53_0poSUhgXl45ocVoVTFgWvEOvravIvtxHr-vzhkqVjYsVka73iN7LEUcP2xGzuMNmWoR829nTlGkKEG4p3ai_sXwFkBZo4tr7PW2S=s0-d-e1-ft#https://public.bnbstatic.com/image/social/telegram-dark.png" width="20" data-bit="iit" style="border-radius: 3px; display: block;">\n                                                                </a>\n                                                              </td>\n                                                            </tr>\n                                                          </tbody>\n                                                        </table>\n                                                      </td>\n                                                    </tr>\n                                                  </tbody>\n                                                </table>\n                                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float: none; display: inline-table;">\n                                                  <tbody>\n                                                    <tr>\n                                                      <td style="padding: 4px; vertical-align: middle;">\n                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius: 3px; width: 20px;">\n                                                          <tbody>\n                                                            <tr>\n                                                              <td style="padding: 0px 5px; font-size: 0; height: 20px; vertical-align: middle; width: 20px;">\n                                                                <a href="https://www.vetgo.vn/" target="_blank" >\n                                                                  <img height="20" src="https://ci6.googleusercontent.com/proxy/K6Au7993Q2fgl7k4U2BfHoRxbKZ94Mp-OlW0bqQeI8JIkHW7FYUkOOgF-a5FFVJPgtgrK4pW9BGX0-aIDXY3wucgJiIwVbIxc7B2Nf_C=s0-d-e1-ft#https://public.bnbstatic.com/image/social/facebook-dark.png" width="20" data-bit="iit" style="border-radius: 3px; display: block;">\n                                                                </a>\n                                                              </td>\n                                                            </tr>\n                                                          </tbody>\n                                                        </table>\n                                                      </td>\n                                                    </tr>\n                                                  </tbody>\n                                                </table>\n                                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float: none; display: inline-table;">\n                                                  <tbody>\n                                                    <tr>\n                                                      <td style="padding: 4px; vertical-align: middle;">\n                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius: 3px; width: 20px;">\n                                                          <tbody>\n                                                            <tr>\n                                                              <td style="padding: 0px 5px; font-size: 0; height: 20px; vertical-align: middle; width: 20px;">\n                                                                <a href="https://www.vetgo.vn/" target="_blank" >\n                                                                  <img height="20" src="https://ci4.googleusercontent.com/proxy/bTYvt7pFkMe655Q1Cpk5ZDxY8IHQsiISq-Twa3eeabEQJkGiPqa4ODw3BD39npl114xEvQBbQLYbT7tEC2HImm8jeEO77T8OmjHio3US=s0-d-e1-ft#https://public.bnbstatic.com/image/social/linkedin-dark.png" width="20" data-bit="iit" style="border-radius: 3px; display: block;">\n                                                                </a>\n                                                              </td>\n                                                            </tr>\n                                                          </tbody>\n                                                        </table>\n                                                      </td>\n                                                    </tr>\n                                                  </tbody>\n                                                </table>\n                                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float: none; display: inline-table;">\n                                                  <tbody>\n                                                    <tr>\n                                                      <td style="padding: 4px; vertical-align: middle;">\n                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius: 3px; width: 20px;">\n                                                          <tbody>\n                                                            <tr>\n                                                              <td style="padding: 0px 5px; font-size: 0; height: 20px; vertical-align: middle; width: 20px;">\n                                                                <a href="https://www.vetgo.vn/" target="_blank" >\n                                                                  <img height="20" src="https://ci5.googleusercontent.com/proxy/JV337qEmHSlU3zvEhfhrFzW1ZJzNtMs08ZywZMo6i40ZAihSFETYkh6fnGpabTG34TI3l355s7YT7tejg2JU4SOlTOgm5FrNEGxrggc=s0-d-e1-ft#https://public.bnbstatic.com/image/social/youtube-dark.png" width="20" data-bit="iit" style="border-radius: 3px; display: block;">\n                                                                </a>\n                                                              </td>\n                                                            </tr>\n                                                          </tbody>\n                                                        </table>\n                                                      </td>\n                                                    </tr>\n                                                  </tbody>\n                                                </table>\n                                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float: none; display: inline-table;">\n                                                  <tbody>\n                                                    <tr>\n                                                      <td style="padding: 4px; vertical-align: middle;">\n                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius: 3px; width: 20px;">\n                                                          <tbody>\n                                                            <tr>\n                                                              <td style="padding: 0px 5px; font-size: 0; height: 20px; vertical-align: middle; width: 20px;">\n                                                                <a href="https://www.vetgo.vn/" target="_blank" >\n                                                                  <img height="20" src="https://ci5.googleusercontent.com/proxy/FYRdyvm0TjFn07YlDlnI8_DXv-gGSM_s00effHNEygHvRJJAVQR8iYz0Azcuwv2aZIYgSgXWbtzyGp4lfh4vi8RJ2PS0ortX6EtM8w=s0-d-e1-ft#https://public.bnbstatic.com/image/social/reddit-dark.png" width="20" data-bit="iit" style="border-radius: 3px; display: block;">\n                                                                </a>\n                                                              </td>\n                                                            </tr>\n                                                          </tbody>\n                                                        </table>\n                                                      </td>\n                                                    </tr>\n                                                  </tbody>\n                                                </table>\n                                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float: none; display: inline-table;">\n                                                  <tbody>\n                                                    <tr>\n                                                      <td style="padding: 4px; vertical-align: middle;">\n                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius: 3px; width: 20px;">\n                                                          <tbody>\n                                                            <tr>\n                                                              <td style="padding: 0px 5px; font-size: 0; height: 20px; vertical-align: middle; width: 20px;">\n                                                                <a href="https://www.vetgo.vn/" target="_blank" >\n                                                                  <img height="20" src="https://ci5.googleusercontent.com/proxy/WMuzzJSKIHAQ_iPy4fuaxQDIhIaLPfE5V9uy6uAbJWQe33Rlu9fIl6NLZBUeLv8HPgrylVnI3Ng0-9449OS5PJIJRVPvcnxLAJW-zYuWXQ=s0-d-e1-ft#https://public.bnbstatic.com/image/social/instagram-dark.png" width="20" data-bit="iit" style="border-radius: 3px; display: block;">\n                                                                </a>\n                                                              </td>\n                                                            </tr>\n                                                          </tbody>\n                                                        </table>\n                                                      </td>\n                                                    </tr>\n                                                  </tbody>\n                                                </table>\n                                              </td>\n                                            </tr>\n                                            <tr>\n                                              <td style="font-size: 0px; word-break: break-word;">\n                                                <div style="font-size: 0; line-height: 0; text-align: left; display: inline-block; width: 100%; direction: ltr;">\n                                                  <div style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 50%;">\n                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="vertical-align: top;">\n                                                      <tbody>\n                                                        <tr>\n                                                          <td align="left" style="font-size: 0px; padding: 5px 5px 5px 5px; word-break: break-word;">\n\n                                                          </td>\n                                                        </tr>\n                                                      </tbody>\n                                                    </table>\n                                                  </div>\n                                                  <div style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 50%;">\n                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="vertical-align: top;">\n                                                      <tbody>\n                                                        <tr>\n                                                          <td align="left" style="font-size: 0px; padding: 5px 5px 11px 5px; padding-bottom: 11px; word-break: break-word;">\n                                                            <div style="font-family: BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif; font-size: 14px; line-height: 20px; text-align: left; color: #000000;"></div>\n                                                          </td>\n                                                        </tr>\n                                                      </tbody>\n                                                    </table>\n                                                  </div>\n                                                </div>\n                                              </td>\n                                            </tr>\n                                          </tbody>\n                                        </table>\n                                      </div>\n                                    </div>\n                                  </td>\n                                </tr>\n                                <tr>\n                                  <td align="left" style="font-size: 0px; padding: 5px 5px 5px 5px; word-break: break-word;">\n\n                                  </td>\n                                </tr>\n                              </tbody>\n                            </table>\n                          </div>\n                        </td>\n                      </tr>\n                    </tbody>\n                  </table>\n                </div>\n                <div style="margin: 0px auto; max-width: 590px;">\n                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">\n                    <tbody>\n                      <tr>\n                        <td style="direction: ltr; font-size: 0px; padding: 5px 5px 5px 5px; text-align: center;">\n                          <div style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">\n                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="vertical-align: top;">\n                              <tbody>\n                                <tr>\n                                  <td align="center" style="font-size: 0px; padding: 5px 5px 5px 5px; word-break: break-word;">\n                                    <div style="font-family: BinancePlex,Arial,PingFangSC-Regular,'Microsoft YaHei',sans-serif; font-size: 11px; line-height: 15px; text-align: center; color: #000000;">© 2023 <span>VetGo</span>.vn </div>\n                                  </td>\n                                </tr>\n                              </tbody>\n                            </table>\n                          </div>\n                        </td>\n                      </tr>\n                    </tbody>\n                  </table>\n                </div>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n\n  <div></div>\n  <div></div>\n</div>\n`),
            }),
            { status: "SUCCESS" }
          );
        }
        decodeOtp(r) {
          return a.AES.decrypt(r, "VETGODEV").toString(a.enc.Utf8);
        }
      }
      const uuid = () => Utilities.getUuid(),
        getDeploymentId = () => {
          const a = ScriptApp.getService()
            .getUrl()
            .match(/\/s\/(.*?)\/exec/);
          let r = "";
          return a && a[1] && (r = a[1]), r;
        };
      class s {
        constructor() {
          this.app = SpreadsheetApp.getActiveSpreadsheet();
        }
        getById(a, r) {
          const i = this.app.getSheetByName(a);
          if (i) {
            const a = i.getRange(1, 1, 1, i.getLastColumn()).getValues()[0],
              o = a.reduce((a, r, i) => ((a[i] = r), a), {}),
              s = i
                .getRange(1, 1, i.getLastRow(), 1)
                .getValues()
                .findIndex(([a]) => a == r);
            if (-1 != s) {
              return {
                status: "SUCCESS",
                data: i
                  .getRange(s + 1, 1, 1, a.length)
                  .getValues()[0]
                  .reduce((a, r, i) => ((a[o[i]] = r), a), {}),
              };
            }
            return { status: "FAILED", data: null, msg: "FIND NOT FOUND" };
          }
          return { status: "FAILED", data: null, msg: "FIND NOT FOUND" };
        }
        getAll(a) {
          const r = this.app.getSheetByName(a);
          if (r) {
            const a = r.getRange(1, 1, 1, r.getLastColumn()).getValues()[0],
              i = r
                .getRange(r.getMaxRows(), 1)
                .getNextDataCell(SpreadsheetApp.Direction.UP)
                .getRow();
            return r
              .getRange(2, 1, i - 1, a.length)
              .getValues()
              .map((r) => r.reduce((r, i, o) => ((r[a[o]] = i), r), {}));
          }
          return [];
        }
        addAll(a, r = { data: [] }) {
          let i = this.app.getSheetByName(a),
            o = [],
            s = [],
            l = [];
          if (Array.isArray(r.data)) {
            if (((o = r.data), !(o.length > 0)))
              return { status: "FAILED", data: null, msg: "FIND NOT FOUND" };
            s = Object.keys(
              Object.assign({}, o[0], {
                deleted: null,
                seqNo: null,
                createdAt: null,
                lastUpdated: null,
              })
            );
          } else
            (o = [r.data]),
              (s = Object.keys(
                Object.assign({}, r.data, {
                  deleted: null,
                  seqNo: null,
                  createdAt: null,
                  lastUpdated: null,
                })
              ));
          i ||
            (Logger.log("creat table if dont exits"),
            this.app.insertSheet(a),
            (i = this.app.getSheetByName(a)),
            i.getRange(1, 1, 1, s.length).setValues([s])),
            (l = i.getRange(1, 1, 1, i.getLastColumn()).getValues()[0]);
          const d = i
            .getRange(2, 1, i.getLastRow(), 1)
            .getValues()
            .reduce((a, r, i) => ((a[[r]] = i + 1), a), {});
          delete d[""];
          const c = [],
            p = l.reduce((a, r, i) => ((a[i] = r), a), {}),
            g = [];
          for (let a = 0; a < o.length; a++) {
            const r = i
                .getRange(i.getMaxRows(), 1)
                .getNextDataCell(SpreadsheetApp.Direction.UP)
                .getRow(),
              h = Object.keys(p)
                .map((a) => Number(a))
                .sort((a, r) => a - r)
                .map((r) => o[a][p[r]]);
            if (
              Object.keys(
                Object.assign({}, o[a], {
                  deleted: null,
                  seqNo: null,
                  createdAt: null,
                  lastUpdated: null,
                })
              ).length !== s.length
            )
              throw new Error("Column is not match.");
            if (null === o[a].id || "" === o[a].id || void 0 === d[o[a].id]) {
              (null != h[0] && "" !== h[0]) || (h[0] = uuid());
              const i = l.indexOf("deleted"),
                s = l.indexOf("seqNo"),
                p = l.indexOf("createdAt"),
                u = l.indexOf("lastUpdated");
              (h[i] = !1),
                (h[s] = new Date().getTime()),
                (h[p] = new Date().toISOString()),
                (h[u] = new Date().toISOString()),
                g.push(h),
                (d[h[0]] = r),
                (o[a].id = h[0]),
                c.push(o[a]);
            } else {
              const r = i.getRange(d[o[a].id] + 1, 1, 1, s.length);
              r.setNumberFormat("@");
              const p = l.indexOf("deleted"),
                g = l.indexOf("seqNo"),
                u = l.indexOf("createdAt"),
                f = l.indexOf("lastUpdated");
              (h[p] = !1),
                (h[g] = new Date().getTime()),
                (h[u] = r.getValues()[0][u]),
                (h[f] = new Date().toISOString()),
                r.setValues([h]),
                c.push(o[a]);
            }
          }
          if (g.length > 0) {
            const a = i
              .getRange(i.getMaxRows(), 1)
              .getNextDataCell(SpreadsheetApp.Direction.UP)
              .getRow();
            i.insertRows(i.getLastRow() + 1, g.length);
            const r = i.getRange(a + 1, 1, g.length, s.length);
            r.setNumberFormat("@"), r.setValues(g);
          }
          return c;
        }
        add(a, r = { data: { deleted: !1, id: null } }) {
          let i = [],
            o = [],
            s = this.app.getSheetByName(a);
          if (
            (s ||
              (Logger.log("creat table if dont exits"),
              this.app.insertSheet(a),
              (s = this.app.getSheetByName(a)),
              Logger.log(s.getRange(1, 1, 1, 3).getValues()),
              (i = Object.keys(
                Object.assign({}, r.data, {
                  deleted: null,
                  seqNo: null,
                  createdAt: null,
                  lastUpdated: null,
                })
              )),
              s.getRange(1, 1, 1, i.length).setValues([i])),
            (i = Object.keys(
              Object.assign({}, r.data, {
                deleted: null,
                seqNo: null,
                createdAt: null,
                lastUpdated: null,
              })
            )),
            (o = s.getRange(1, 1, 1, s.getLastColumn()).getValues()[0]),
            o.length === i.length)
          ) {
            const a = o.reduce((a, r, i) => ((a[i] = r), a), {}),
              l = Object.keys(a)
                .map((a) => Number(a))
                .sort((a, r) => a - r)
                .map((i) => r.data[a[i]]),
              d = s
                .getRange(s.getMaxRows(), 1)
                .getNextDataCell(SpreadsheetApp.Direction.UP)
                .getRow(),
              c = s
                .getRange(1, 1, s.getLastRow(), 1)
                .getValues()
                .findIndex(([a]) => a == r.data.id);
            if ((Logger.log(c), -1 != c)) {
              const a = s.getRange(c + 1, 1, 1, i.length);
              a.setNumberFormat("@");
              const d = o.indexOf("deleted"),
                p = o.indexOf("seqNo"),
                g = o.indexOf("createdAt"),
                h = o.indexOf("lastUpdated");
              return (
                (l[d] = !1),
                (l[p] = new Date().getTime()),
                (l[g] = a.getValues()[0][g]),
                (l[h] = new Date().toISOString()),
                a.setValues([l]),
                { status: "SUCCESS", data: r.data, msg: "UPDATE" }
              );
            }
            {
              s.insertRows(s.getLastRow() + 1, 1),
                (null != l[0] && "" !== l[0]) || (l[0] = uuid());
              const a = s.getRange(d + 1, 1, 1, i.length);
              a.setNumberFormat("@");
              const c = o.indexOf("deleted"),
                p = o.indexOf("seqNo"),
                g = o.indexOf("createdAt"),
                h = o.indexOf("lastUpdated");
              return (
                (l[c] = !1),
                (l[p] = new Date().getTime()),
                (l[g] = new Date().toISOString()),
                (l[h] = new Date().toISOString()),
                a.setValues([l]),
                (r.data.id = l[0]),
                { status: "SUCCESS", data: r.data, msg: "INSERT" }
              );
            }
          }
          return { status: "FAILED", data: o, msg: "Column is not match" };
        }
        upload(a) {
          let r = Utilities.base64Decode(a.base64.split("base64,").pop()),
            i = Utilities.newBlob(r, a.type, a.name);
          const o = DriveApp.getFolderById(DriveApp.getRootFolder().getId()),
            s = o.getFoldersByName("CLIENT_IMAGES");
          let l;
          return (
            (l = s.hasNext() ? s.next() : o.createFolder("CLIENT_IMAGES")),
            {
              status: "SUCCESS",
              data: `https://drive.google.com/uc?export=view&id=${l
                .createFile(i)
                .setSharing(
                  DriveApp.Access.ANYONE_WITH_LINK,
                  DriveApp.Permission.VIEW
                )
                .getId()}`,
              msg: "UPDATE",
            }
          );
        }
        databases(a = []) {
          const r = a.reduce((a, r) => {
            const i = r,
              o = this.app.getSheetByName(i);
            if (!o) return a;
            const s = o.getRange(1, 1, 1, o.getLastColumn()).getValues()[0],
              l = o
                .getRange(o.getMaxRows(), 1)
                .getNextDataCell(SpreadsheetApp.Direction.UP)
                .getRow();
            let d = o
              .getRange(2, 1, l - 1, s.length)
              .getValues()
              .map((a) => a.reduce((a, r, i) => ((a[s[i]] = r), a), {}));
            return (a[i] = d), a;
          }, {});
          return r;
        }
        delete(a, r) {
          const i = this.app.getSheetByName(a);
          if (i) {
            const a = i.getRange(1, 1, 1, i.getLastColumn()).getValues()[0],
              o = i
                .getRange(1, 1, i.getLastRow(), 1)
                .getValues()
                .findIndex(([a]) => a === r);
            if ((Logger.log(o), -1 !== o)) {
              const r = i.getRange(o + 1, 1, 1, a.length);
              r.setNumberFormat("@");
              const s = a.indexOf("deleted"),
                l = a.indexOf("seqNo"),
                d = a.indexOf("lastUpdated"),
                c = r.getValues()[0];
              return (
                (c[s] = !0),
                (c[l] = new Date().getTime()),
                (c[d] = new Date().toISOString()),
                r.setValues([c]),
                { status: "SUCCESS", data: null, msg: "DELETE" }
              );
            }
            return { status: "FAILED", data: null, msg: "NOT FOUND" };
          }
          return { status: "FAILED", data: null, msg: "NOT FOUND" };
        }
        clear(a) {
          const r = this.app.getSheetByName(a);
          return r
            ? (this.app.deleteSheet(r),
              { status: "SUCCESS", data: null, msg: "DELETE" })
            : { status: "FAILED", data: null, msg: "NOT FOUND" };
        }
        zalo(a) {
          if (a.qrCode) {
            let r = Utilities.base64Decode(a.qrCode.split("base64,").pop()),
              i = Utilities.newBlob(
                r,
                "image/png",
                "qrCode-" + new Date().getTime()
              );
            const o = DriveApp.getFolderById(DriveApp.getRootFolder().getId()),
              s = o.getFoldersByName("DEVICE_REMOTE");
            let l;
            l = s.hasNext() ? s.next() : o.createFolder("DEVICE_REMOTE");
            let d = `https://drive.google.com/uc?export=view&id=${l
              .createFile(i)
              .setSharing(
                DriveApp.Access.ANYONE_WITH_LINK,
                DriveApp.Permission.VIEW
              )
              .getId()}`;
            a.qrCode = d;
          }
          return { qrCode: a.qrCode };
        }
      }
      class l {
        constructor(
          a = "https://zalo-chat-management-default-rtdb.asia-southeast1.firebasedatabase.app"
        ) {
          this.firebaseUrl = a;
        }
        addAll(a = "", r = []) {
          const i = `/${a}.json`,
            o = UrlFetchApp.fetch(
              this.firebaseUrl + i + "?orderBy=%22seqNo%22&startAt=0",
              { method: "get", contentType: "application/json" }
            ).getContentText();
          if (!o) return [];
          const s = JSON.parse(o),
            l = r
              .map((a, r) =>
                Object.assign({}, a, { seqNo: new Date().getTime() + r })
              )
              .reduce(
                (a, r) => (
                  (a[r.id || uuid()] = r), s && s[r.id] && delete s[r.id], a
                ),
                {}
              ),
            d = {
              method: "put",
              contentType: "application/json",
              payload: JSON.stringify(Object.assign({}, s, l)),
            },
            c = UrlFetchApp.fetch(this.firebaseUrl + i, d).getContentText();
          return JSON.parse(c);
        }
        getAll(a = "") {
          const r = `/${a}.json`,
            i = UrlFetchApp.fetch(this.firebaseUrl + r, {
              method: "get",
              contentType: "application/json",
            }).getContentText(),
            o = JSON.parse(i);
          return o ? Object.values(o) : [];
        }
        getBySeqNo(a = "", r = 0, i) {
          let o = "";
          i && (o = `&auth=${i}`);
          const s = `/${a}.json?orderBy=%22seqNo%22&startAt=${r}${o}`,
            l = UrlFetchApp.fetch(this.firebaseUrl + s, {
              method: "get",
              contentType: "application/json",
              muteHttpExceptions: !0,
            }).getContentText(),
            d = JSON.parse(l);
          return d ? Object.values(d) : [];
        }
        deleteById(a = "", r = "") {
          const i = `/${a}/${r}.json`,
            o = UrlFetchApp.fetch(this.firebaseUrl + i, {
              method: "delete",
              contentType: "application/json",
            }).getContentText();
          return Logger.log(o), { status: "success" };
        }
        updateById(a, r, i, o) {
          let s = "";
          if ((o && (s = `?auth=${o}`), !r))
            return { status: "error", data: null };
          const l = `/${a}/${r}.json${s}`,
            d = {
              method: "patch",
              contentType: "application/json",
              payload: JSON.stringify(
                Object.assign({}, i, { seqNo: new Date().getTime() })
              ),
            },
            c = UrlFetchApp.fetch(this.firebaseUrl + l, d).getContentText();
          return Logger.log(c), { status: "success", data: JSON.parse(c) };
        }
        getById(a = "", r = "") {
          const i = `/${a}/${r}.json`,
            o = UrlFetchApp.fetch(this.firebaseUrl + i, {
              method: "get",
              contentType: "application/json",
            }).getContentText();
          if (!o) return { data: null, msg: "Not found" };
          return { data: JSON.parse(o) };
        }
        makeQueryString(a, r = {}) {
          const i = Object.keys(r)
            .map((a) => `${encodeURIComponent(a)}=${encodeURIComponent(r[a])}`)
            .join("&");
          return a + (a.indexOf("?") >= 0 ? "&" : "?") + i;
        }
      }
      const d = "MANAGER_SHEET";
      class c {
        addContact(a = []) {
          let r = [];
          for (let i = 0; i < a.length; i++) {
            const o = a[i],
              s = {
                names: [{ givenName: o.fullName, familyName: "" }],
                phoneNumbers: [{ value: o.phone, type: "mobile" }],
                biographies: [{ value: JSON.stringify(o) }],
                organizations: [{ name: o.group, title: "API", type: "work" }],
              },
              l = People.People.createContact(s);
            r.push(l);
          }
          return r;
        }
      }
      function e(a) {
        this.message = a;
      }
      (e.prototype = new Error()), (e.prototype.name = "InvalidCharacterError");
      var p =
        ("undefined" != typeof window &&
          window.atob &&
          window.atob.bind(window)) ||
        function (a) {
          var r = String(a).replace(/=+$/, "");
          if (r.length % 4 == 1)
            throw new e(
              "'atob' failed: The string to be decoded is not correctly encoded."
            );
          for (
            var i, o, s = 0, l = 0, d = "";
            (o = r.charAt(l++));
            ~o && ((i = s % 4 ? 64 * i + o : o), s++ % 4)
              ? (d += String.fromCharCode(255 & (i >> ((-2 * s) & 6))))
              : 0
          )
            o =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(
                o
              );
          return d;
        };
      function t(a) {
        var r = a.replace(/-/g, "+").replace(/_/g, "/");
        switch (r.length % 4) {
          case 0:
            break;
          case 2:
            r += "==";
            break;
          case 3:
            r += "=";
            break;
          default:
            throw "Illegal base64url string!";
        }
        try {
          return (function (a) {
            return decodeURIComponent(
              p(a).replace(/(.)/g, function (a, r) {
                var i = r.charCodeAt(0).toString(16).toUpperCase();
                return i.length < 2 && (i = "0" + i), "%" + i;
              })
            );
          })(r);
        } catch (a) {
          return p(r);
        }
      }
      function n(a) {
        this.message = a;
      }
      (n.prototype = new Error()), (n.prototype.name = "InvalidTokenError");
      const jwt_decode_esm = function (a, r) {
        if ("string" != typeof a) throw new n("Invalid token specified");
        var i = !0 === (r = r || {}).header ? 0 : 1;
        try {
          return JSON.parse(t(a.split(".")[i]));
        } catch (a) {
          throw new n("Invalid token specified: " + a.message);
        }
      };
      class g {
        config(a = "", r = "") {
          const i = PropertiesService.getScriptProperties();
          return i.setProperty(a, r), i.getProperty(a);
        }
        getToken(a = "", r = "") {
          Logger.log(a), Logger.log(r);
          const i = {
              scopes: "PublicApi.Access",
              grant_type: "client_credentials",
              client_id: a,
              client_secret: r,
            },
            o = UrlFetchApp.fetch("https://id.kiotviet.vn/connect/token", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              payload: i,
              muteHttpExceptions: !0,
            }).getContentText();
          return JSON.parse(o);
        }
        invoiceLastModifiedFrom(a = "", r = "") {
          const i = {
            method: "get",
            jwt: a,
            payload: null,
            path: `https://public.kiotapi.com/invoices?lastModifiedFrom=${r}`,
          };
          return this.forWordCall(i);
        }
        forWordCall(a = { method: "get", jwt: "", payload: {}, path: "" }) {
          const { client_RetailerCode: r } = jwt_decode_esm(a.jwt),
            i = {
              Retailer: r,
              "Content-Type": "application/json",
              Authorization: `Bearer ${a.jwt}`,
            };
          let o = {};
          "post" === a.method && (o = { payload: JSON.stringify(a.payload) });
          const s = Object.assign({ method: a.method, headers: i }, o, {
              muteHttpExceptions: !0,
            }),
            l = UrlFetchApp.fetch(a.path, s);
          return JSON.parse(l.getContentText());
        }
        getAll(a = { jwt: "", path: "", query: {} }) {
          const { client_RetailerCode: r } = jwt_decode_esm(a.jwt),
            i = a.path;
          try {
            const o = Object.assign({ pageSize: 100 }, a.query),
              s =
                i +
                "?" +
                Object.keys(o)
                  .map(function (a) {
                    return a + "=" + encodeURIComponent(o[a]);
                  })
                  .join("&"),
              l = {
                method: "get",
                headers: {
                  Retailer: r,
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${a.jwt}`,
                },
              },
              d = UrlFetchApp.fetch(s, l);
            if (200 == d.getResponseCode()) {
              const r = JSON.parse(d.getContentText()).total,
                o = [];
              for (let s = 0; s < r; s += 100)
                o.push(this.fetchPageOfAll(i, 100, s, l, a.query));
              return [].concat(...o);
            }
            return [];
          } catch (a) {
            return [];
          }
        }
        fetchPageOfAll(a, r, i, o, s) {
          const l = Object.assign({ pageSize: r, currentItem: i }, s),
            d =
              a +
              "?" +
              Object.keys(l)
                .map((a) => a + "=" + encodeURIComponent(l[a]))
                .join("&"),
            c = UrlFetchApp.fetch(d, o);
          if (200 == c.getResponseCode()) {
            return JSON.parse(c.getContentText()).data;
          }
          return [];
        }
        createInvoice(a, r = "") {
          const { client_RetailerCode: i } = jwt_decode_esm(r),
            o = {
              method: "post",
              headers: {
                Retailer: i,
                "Content-Type": "application/json",
                Authorization: `Bearer ${r}`,
              },
              payload: JSON.stringify(a),
              muteHttpExceptions: !0,
            },
            s = UrlFetchApp.fetch("https://public.kiotapi.com/invoices", o);
          return JSON.parse(s.getContentText());
        }
      }
      class h {
        sendTelegramMessage(a = "") {
          const r =
              "https://api.telegram.org/bot6673410567:AAFlIFwjzMPgMyzAssjHnYlZfNSR-zt3Od8/sendMessage?chat_id=-965779970&text=" +
              encodeURIComponent(a),
            i = UrlFetchApp.fetch(r);
          return JSON.parse(i.getContentText());
        }
        log(a = "") {
          const r =
              "https://api.telegram.org/bot6146864003:AAGMpVAPNwNzAXyj9je6r79M6ivx23VUYPo/sendMessage?chat_id=-4054738298&text=" +
              encodeURIComponent(a),
            i = UrlFetchApp.fetch(r);
          return JSON.parse(i.getContentText());
        }
      }
      const u = new h();
      class f {
        constructor() {}
        delete(a = "", r = "", i = []) {
          const o = this.getTable(a, r).getFilesByName("data.json");
          if (!o.hasNext()) return { status: "success", msg: "" };
          {
            const a = o.next(),
              r = a.getBlob().getDataAsString();
            try {
              const o = JSON.parse(r);
              for (let [a, r] of i.entries())
                u.log("delete " + r),
                  (o[String(r)] = Object.assign({}, o[String(r)], {
                    deleted: !0,
                    seqNo: new Date().getTime() + a,
                  }));
              return (
                a.setContent(JSON.stringify(o)),
                Logger.log("Nội dung tệp JSON:"),
                { status: "success", msg: "update " }
              );
            } catch (a) {
              return (
                Logger.log("Lỗi khi phân tích nội dung JSON: " + a),
                { status: "error", msg: "decode" }
              );
            }
          }
        }
        getBySeqNo(a = "", r = "", i = 0) {
          return (this.getAll(a, r).content || []).filter((a) => a.seqNo > i);
        }
        patch(a = "", r = "", i = []) {
          const o = (i || []).reduce(
              (a, r, i) => (r.id && (a[String(r.id)] = r), a),
              {}
            ),
            s = this.getTable(a, r),
            l = s.getFilesByName("data.json");
          if (!l.hasNext())
            return (
              s.createFile("data.json", JSON.stringify(o), MimeType.PLAIN_TEXT),
              { status: "success", msg: "create json" }
            );
          {
            const a = l.next();
            try {
              return (
                a.setContent(JSON.stringify(o)),
                Logger.log("Nội dung tệp JSON:"),
                { status: "success", msg: "update json" }
              );
            } catch (a) {
              Logger.log("Lỗi khi phân tích nội dung JSON: " + a);
            }
          }
        }
        insert(a = "", r = "", i = []) {
          const o = (i || []).reduce(
              (a, r, i) => (
                r.id &&
                  (a[String(r.id)] = Object.assign({}, r, {
                    seqNo: new Date().getTime() + i,
                  })),
                a
              ),
              {}
            ),
            s = this.getTable(a, r),
            l = s.getFilesByName("data.json");
          if (!l.hasNext()) {
            s.createFile("data.json", JSON.stringify(o), MimeType.PLAIN_TEXT);
            return { status: "success", msg: "create json" };
          }
          {
            const a = l.next(),
              r = a.getBlob().getDataAsString();
            try {
              const i = JSON.parse(r),
                s = Object.assign({}, i, o);
              return (
                a.setContent(JSON.stringify(s)),
                Logger.log("Nội dung tệp JSON:"),
                { status: "success", msg: "update json" }
              );
            } catch (a) {
              Logger.log("Lỗi khi phân tích nội dung JSON: " + a);
            }
          }
        }
        getAll(a = "", r = "", i) {
          const o = this.getTable(a, r).getFiles();
          let s = {};
          for (; o.hasNext(); ) {
            const a = o.next();
            if (-1 !== a.getName().indexOf(".json")) {
              const r = a.getBlob().getDataAsString();
              try {
                const a = JSON.parse(r);
                s = Object.assign({}, s, a);
              } catch (a) {}
            }
          }
          const l = Object.values(s);
          if (i) {
            const a = ((a, r = 1, i = 10, o = 10) => {
              let s = r;
              const l = Math.ceil(a / i);
              let d, c;
              if ((s < 1 ? (s = 1) : s > l && (s = l), l <= o))
                (d = 1), (c = l);
              else {
                const a = Math.floor(o / 2),
                  r = Math.ceil(o / 2) - 1;
                s <= a
                  ? ((d = 1), (c = o))
                  : s + r >= l
                  ? ((d = l - o + 1), (c = l))
                  : ((d = s - a), (c = s + r));
              }
              const p = (s - 1) * i,
                g = Math.min(p + i - 1, a - 1),
                h = Array.from(Array(c + 1 - d).keys()).map((a) => d + a);
              return {
                totalItems: a,
                currentPage: s,
                pageSize: i,
                totalPages: l,
                startPage: d,
                endPage: c,
                startIndex: p,
                endIndex: g,
                pages: h,
                data: [],
              };
            })(l.length, i.page, i.size);
            return {
              content: l.slice(a.startIndex, a.endIndex + 1),
              totalElements: l.length,
            };
          }
          return { content: l, totalElements: l.length };
        }
        getTable(a = "", r = "") {
          const i = this.getDatabase(a),
            o = i.getFoldersByName(r);
          if (o.hasNext()) return o.next();
          return i.createFolder(r);
        }
        getDatabase(a = "") {
          const r = this.getRootStore(),
            i = r.getFoldersByName(a);
          if (i.hasNext()) return i.next();
          return r.createFolder(a);
        }
        getRootStore() {
          const a = "STORE_APP",
            r = DriveApp.getRootFolder(),
            i = r.getFoldersByName(a);
          if (i.hasNext()) return Logger.log("Thư mục đã tồn tại."), i.next();
          {
            Logger.log("Thư mục chưa tồn tại. Đang tạo mới...");
            const i = r.createFolder(a);
            return Logger.log("Thư mục đã được tạo mới."), i;
          }
        }
      }
      function toInteger(a) {
        if (null === a || !0 === a || !1 === a) return NaN;
        var r = Number(a);
        return isNaN(r) ? r : r < 0 ? Math.ceil(r) : Math.floor(r);
      }
      function _typeof(a) {
        return (
          (_typeof =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (a) {
                  return typeof a;
                }
              : function (a) {
                  return a &&
                    "function" == typeof Symbol &&
                    a.constructor === Symbol &&
                    a !== Symbol.prototype
                    ? "symbol"
                    : typeof a;
                }),
          _typeof(a)
        );
      }
      function requiredArgs(a, r) {
        if (r.length < a)
          throw new TypeError(
            a +
              " argument" +
              (a > 1 ? "s" : "") +
              " required, but only " +
              r.length +
              " present"
          );
      }
      function toDate(a) {
        requiredArgs(1, arguments);
        var r = Object.prototype.toString.call(a);
        return a instanceof Date ||
          ("object" === _typeof(a) && "[object Date]" === r)
          ? new Date(a.getTime())
          : "number" == typeof a || "[object Number]" === r
          ? new Date(a)
          : (("string" != typeof a && "[object String]" !== r) ||
              "undefined" == typeof console ||
              (console.warn(
                "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"
              ),
              console.warn(new Error().stack)),
            new Date(NaN));
      }
      function addMilliseconds(a, r) {
        requiredArgs(2, arguments);
        var i = toDate(a).getTime(),
          o = toInteger(r);
        return new Date(i + o);
      }
      const b = new g(),
        m = new f(),
        y = new h(),
        w = "jobSyncProductKiotViet",
        jobSyncProductKiotViet = () => {
          makeJobSyncProduct(30);
          const a = {},
            r = PropertiesService.getScriptProperties(),
            i = r.getKeys().filter((a) => a.startsWith("RetailerId_"));
          for (let o of i) {
            const i = r.getProperty(o),
              s = JSON.parse(i),
              { client_secret: l, client_id: d, access_token: c } = s;
            if (!c || checkTokenExpiry(c)) {
              const a = b.getToken(d, l);
              if (!a.access_token)
                return (
                  Logger.log("Cấu hình không đúng "),
                  { error: "Cấu hình không đúng" }
                );
              r.setProperty(
                o,
                JSON.stringify(
                  Object.assign({}, s, { access_token: a.access_token })
                )
              ),
                Logger.log("Renew and Save token"),
                (a[o] = jobDetails(a.access_token));
            } else a[o] = jobDetails(c);
          }
          return a;
        },
        makeJobSyncProduct = (a = 5) => {
          y.log("make job sync product: " + a),
            ScriptApp.getProjectTriggers().forEach((a) => {
              a.getHandlerFunction() === w && ScriptApp.deleteTrigger(a);
            }),
            ScriptApp.newTrigger(w)
              .timeBased()
              .at(
                (function (a, r) {
                  return (
                    requiredArgs(2, arguments),
                    addMilliseconds(a, 6e4 * toInteger(r))
                  );
                })(new Date(), a)
              )
              .create();
        },
        jobDetails = (a = "") => {
          const r = b.getAll({
              jwt: a,
              path: "https://public.kiotapi.com/products",
              query: {
                includeInventory: !0,
                includePricebook: !0,
                IncludeSerials: !0,
                IncludeBatchExpires: !0,
                includeWarranties: !0,
                includeQuantity: !0,
                isActive: !0,
              },
            }),
            { client_RetailerId: i } = jwt_decode_esm(a),
            o = m.getAll(String(i), "products"),
            s = mergeData(r, o.content, String(i));
          return m.patch(String(i), "products", s);
        },
        checkTokenExpiry = (a = "") => {
          try {
            const r = jwt_decode_esm(a).exp;
            if (void 0 === r) return !0;
            return !(Math.floor(Date.now() / 1e3) < r);
          } catch (a) {
            return !0;
          }
        },
        mergeData = (a = [], r = [], i = "") => {
          const o = a.reduce((a, r) => ((a[r.id] = r), a), {}),
            s = r.reduce((a, r) => ((a[r.id] = r), a), {}),
            d = [],
            c = [];
          if (
            (a.forEach((a) => {
              const r = s[a.id];
              r && JSON.stringify(toData(r)) === JSON.stringify(toData(a))
                ? d.push(r)
                : ((a.seqNo = new Date().getTime()), d.push(a), c.push(a));
            }),
            r.forEach((a) => {
              o[a.id] ||
                a.deleted ||
                ((a.seqNo = new Date().getTime()),
                (a.deleted = !0),
                d.push(a),
                c.push(a));
            }),
            c.length > 0)
          ) {
            y.log(`Total change ${i}: ${c.length}`);
            const a = PropertiesService.getScriptProperties().getProperty(
              `RetailerId_${i}`
            );
            if (a) {
              const r = JSON.parse(a),
                { databaseURL: o } = r,
                s = `product-update-${i}`;
              new l(o).updateById("WEB_HOOK", s, {
                id: s,
                data: c,
                seqNo: new Date().getTime(),
              });
            }
          }
          return d;
        },
        toData = (a) => ({
          id: a.id,
          createdDate: a.createdDate || "",
          tradeMarkName: a.tradeMarkName || null,
          retailerId: a.retailerId,
          code: a.code || "",
          barCode: a.barCode || "",
          name: a.name || "",
          fullName: a.fullName || "",
          categoryId: a.categoryId || "",
          categoryName: a.categoryName || "",
          allowsSale: a.allowsSale || !1,
          type: a.type || "",
          hasVariants: a.hasVariants || "",
          basePrice: a.basePrice || "",
          weight: a.weight || "",
          unit: a.unit || "",
          conversionValue: a.conversionValue || "",
          description: a.description || "",
          modifiedDate: a.modifiedDate || "",
          isActive: a.isActive || !1,
          isLotSerialControl: a.isLotSerialControl || !1,
          isBatchExpireControl: a.isBatchExpireControl || !1,
          inventories: a.inventories || [],
          priceBooks: a.priceBooks || [],
          attributes: a.attributes || [],
        }),
        webHook = (a) => {
          (a.Notifications || []).forEach((a) => {
            if (
              ((a.Action || "").startsWith("product.update") &&
                makeJobSyncProduct(1),
              (a.Action || "").startsWith("product.delete"))
            ) {
              ((a = "", r = []) => {
                if (r && r.length > 0) {
                  m.delete(String(a), "products", r);
                  const i = PropertiesService.getScriptProperties().getProperty(
                    `RetailerId_${a}`
                  );
                  if (i) {
                    const o = JSON.parse(i),
                      { databaseURL: s } = o,
                      d = new l(s),
                      c = `product-delete-${a}`;
                    y.log("send " + c),
                      d.updateById("WEB_HOOK", c, {
                        id: c,
                        data: r,
                        seqNo: new Date().getTime(),
                      });
                  }
                }
              })(
                (a.Action || "").replaceAll("product.delete.", ""),
                a.Data || []
              );
            }
            if ((a.Action || "").startsWith("stock.update")) {
              ((a = "", r = [{ ProductId: 0, BranchId: 0, OnHand: 0 }]) => {
                if (!r || 0 === r.length) return;
                const i = r.reduce(
                    (a, r) => (
                      (a[`${r.BranchId}_${r.ProductId}`] = r.OnHand), a
                    ),
                    {}
                  ),
                  o = m.getAll(String(a), "products").content;
                o.forEach((a) => {
                  a.inventories.forEach((r) => {
                    const o = `${r.branchId}_${r.productId}`;
                    i[o] &&
                      (y.log("update stock " + r.productId + " " + i[o]),
                      (r.onHand = i[o]),
                      (a.seqNo = new Date().getTime()));
                  });
                }),
                  m.patch(a, "products", o);
                const s = PropertiesService.getScriptProperties().getProperty(
                  `RetailerId_${a}`
                );
                if (s) {
                  const i = JSON.parse(s),
                    { databaseURL: o } = i,
                    d = new l(o),
                    c = `stock-update-${a}`;
                  y.log("send " + c),
                    d.updateById("WEB_HOOK", c, {
                      id: c,
                      data: r,
                      seqNo: new Date().getTime(),
                    });
                }
              })(
                (a.Action || "").replaceAll("stock.update.", ""),
                a.Data || []
              );
            }
            (a.Action || "").startsWith("customer.update"),
              (a.Action || "").startsWith("customer.delete");
          });
        },
        v = ["exp"];
      const x =
        "ZPYu33tz8QYU3hwJQXgHpZsKfYn0r2poopBx7x1n3rmeIvuGU4wf65kk6rV1DrN";
      const _ = "woo",
        S = "pkvetgo",
        k = "phathuy",
        A = "diamond-vet",
        T = "moon-pet",
        C = "thapcham-vetgo",
        I = "petshop-vet",
        B = "petplus",
        D = {
          [B]: {
            sheetId:
              "AKfycbxksjNgYZWqAeHWERQiXbyGh5Q8wsTfMVpJ49sZKe7dCELlxe7LIq_OFyXk0HSJmQKb",
            firebase: {
              apiKey: "AIzaSyDdKB4XXkT7sAcTTZh1Ep9_baxiabZ7jJs",
              authDomain: "petplus-vet.firebaseapp.com",
              databaseURL:
                "https://petplus-vet-default-rtdb.asia-southeast1.firebasedatabase.app",
              projectId: "petplus-vet",
              storageBucket: "petplus-vet.appspot.com",
              messagingSenderId: "1033394551475",
              appId: "1:1033394551475:web:5b7493a4d4075f391e0ec6",
              measurementId: "G-96FTV4MEDV",
            },
            retailer: B,
          },
          [I]: {
            sheetId:
              "AKfycbzOO67gHrQFUig27Nb8jKl2TppU9JH30rL7mdjDptwiDDpjyyOJ08dffXmKckEMdh4RVg",
            firebase: {
              apiKey: "AIzaSyD1FBwmoxJnUUOMNyer5uKK3sTW-DrP-cI",
              authDomain: "petshop-vet.firebaseapp.com",
              databaseURL:
                "https://petshop-vet-default-rtdb.asia-southeast1.firebasedatabase.app",
              projectId: "petshop-vet",
              storageBucket: "petshop-vet.appspot.com",
              messagingSenderId: "267283370817",
              appId: "1:267283370817:web:c0a52c8f3e68f2aafa47c0",
              measurementId: "G-12PSW860VC",
            },
            retailer: I,
          },
          [C]: {
            sheetId:
              "AKfycby1DJyPI7dfbfZMnPQRIqnwoqX5iDt_TDkE2Kb8PTNTlIgB1aheC1zJOh-Csu2pn997",
            firebase: {
              apiKey: "AIzaSyCwydnCPnq-UUikC55tofywO68pyfihbp0",
              authDomain: "thapcham-vetgo.firebaseapp.com",
              databaseURL:
                "https://thapcham-vetgo-default-rtdb.asia-southeast1.firebasedatabase.app",
              projectId: "thapcham-vetgo",
              storageBucket: "thapcham-vetgo.appspot.com",
              messagingSenderId: "76448835845",
              appId: "1:76448835845:web:3b5910a8ff26011c3f6f6c",
              measurementId: "G-50DQJD5JSV",
            },
            retailer: C,
          },
          [T]: {
            sheetId:
              "AKfycbxc3vqfXLpya1JPD7XpNEuekoIBNgRcyv4vrdRSCBVrMiz7gQxy6AXoGmpQR94TN2LgxA",
            firebase: {
              apiKey: "AIzaSyDY4x9WmbkXvaB9NIqjZWn53aY-0Y9Lsk0",
              authDomain: "moon-pet.firebaseapp.com",
              projectId: "moon-pet",
              storageBucket: "moon-pet.appspot.com",
              messagingSenderId: "482165610078",
              appId: "1:482165610078:web:403ad1ce8f94a8c120c6cf",
              measurementId: "G-1GE6NNL796",
              databaseURL:
                "https://moon-pet-default-rtdb.asia-southeast1.firebasedatabase.app",
            },
            retailer: T,
          },
          [A]: {
            sheetId:
              "AKfycbxICXgSUCWsl2_tJrqzLCz-2L6sfQJoEnYFxiTCQtGQuMEM4kJa6UyWo9Gjg3iRmnB1",
            firebase: {
              apiKey: "AIzaSyCfqJnPL746v93B1k-HbiMvOktrp6dsNH8",
              authDomain: "diamond-vet.firebaseapp.com",
              databaseURL:
                "https://diamond-vet-default-rtdb.asia-southeast1.firebasedatabase.app",
              projectId: "diamond-vet",
              storageBucket: "diamond-vet.appspot.com",
              messagingSenderId: "1061720574160",
              appId: "1:1061720574160:web:7e60d8ae9990e10fc8b6d5",
              measurementId: "G-YNYZN2VY70",
            },
            retailer: A,
          },
          [k]: {
            firebase: {
              apiKey: "AIzaSyDd_omzIAPj-o0JjS9mDSgaAUtZWYIxaUk",
              authDomain: "phathuy-vetgo.firebaseapp.com",
              projectId: "phathuy-vetgo",
              storageBucket: "phathuy-vetgo.appspot.com",
              messagingSenderId: "386616370919",
              appId: "1:386616370919:web:3cf4377bb90f373e14a442",
              databaseURL:
                "https://phathuy-vetgo-default-rtdb.asia-southeast1.firebasedatabase.app",
              measurementId: "G-NPXFEBN0PE",
            },
            sheetId:
              "AKfycbxKPwjXUowbJqjDJTWrwXC7IAOLHgTzxG3vQ7q9cFKZgU4m_EdGeHbTzMTalToODG9y7Q",
            retailer: [k],
          },
          [S]: {
            firebase: {
              apiKey: "AIzaSyAHufb49s_cTc38UrmlWv7lezx7yGaEin8",
              authDomain: "pkvetgo.firebaseapp.com",
              databaseURL:
                "https://pkvetgo-default-rtdb.asia-southeast1.firebasedatabase.app",
              projectId: "pkvetgo",
              storageBucket: "pkvetgo.appspot.com",
              messagingSenderId: "232692028709",
              appId: "1:232692028709:web:6f52683be23a127dec36cc",
              measurementId: "G-ZZT07CSZ71",
            },
            sheetId:
              "AKfycbxU7dksolcWldZ3GnVj9iDnH2CWszlOvFTcifLSKg-Y0v0fTxscOmmn9RKJ5m-3QJUl",
            retailer: [S],
          },
          [_]: {
            firebase: {
              apiKey: "AIzaSyAkvfVlnsED0THvkB8Rkd1NEWkGpV6Rd-4",
              authDomain: "woo-vet.firebaseapp.com",
              databaseURL:
                "https://woo-vet-default-rtdb.asia-southeast1.firebasedatabase.app",
              projectId: "woo-vet",
              storageBucket: "woo-vet.appspot.com",
              messagingSenderId: "288726193438",
              appId: "1:288726193438:web:8003ccdf8dad653b98250f",
              measurementId: "G-86VWRZZ5LM",
            },
            sheetId:
              "AKfycbwoZcro1uBFUL1QqBtBDgWzPW_dC4l3IKCndxW-nA20uFRyGZ_08eDa_oIC998FP69gjA",
            retailer: _,
          },
          petland: {
            firebase: {
              apiKey: "AIzaSyAWaHPjOoFUCj_RPqLpblrzZpLtQvQSzsQ",
              authDomain: "petland-2023.firebaseapp.com",
              databaseURL:
                "https://petland-2023-default-rtdb.asia-southeast1.firebasedatabase.app",
              projectId: "petland-2023",
              storageBucket: "petland-2023.appspot.com",
              messagingSenderId: "950334497178",
              appId: "1:950334497178:web:fd72791ab2c60d0edada23",
              measurementId: "G-CDCK7C4JQB",
            },
            sheetId:
              "AKfycbyFfAdcB7nl05LtU7ofTw04hn7vYwl0-0V__bDaFCPvj9YN_t0hlLmE1UsUccx1mtyZ",
            retailer: "petland",
          },
          "vetgo-01": {
            sheetId:
              "AKfycbwVPtWi1Sfx13sNtpSGqFBi4HBRQ1CyWCEcAtoHSPufR76xL4VJBkkIBpZ3DidWCzzT",
            firebase: {
              apiKey: "AIzaSyAOi_TN4at6W__9Jjzz31EEzMxQS5nf1s0",
              authDomain: "vetgo-01.firebaseapp.com",
              databaseURL:
                "https://vetgo-01-default-rtdb.asia-southeast1.firebasedatabase.app",
              projectId: "vetgo-01",
              storageBucket: "vetgo-01.appspot.com",
              messagingSenderId: "883303533949",
              appId: "1:883303533949:web:fcd2839a459ed1ae6e1014",
              measurementId: "G-TFR9L0R342",
            },
            retailer: "vetgo-01",
          },
        },
        E = {
          "woo-vet.web.app": _,
          "pkvetgo.web.app": S,
          "phathuy-vetgo.web.app": k,
          "diamond-vet.web.app": A,
          "moon-pet.web.app": T,
          "thapcham-vetgo.web.app": C,
          "petshop-vet.web.app": I,
          "petplus-vet.web.app": B,
        },
        z = "admin@gmail.com",
        N = "Vetgo@123";
      const O = new i(),
        M = new o(),
        U = new s(),
        H = new l(),
        L = new (class {
          constructor(a = new s(), r = new o(), l = new i()) {
            (this.tableCrud = a), (this.sendEmail = r), (this.cryptojs = l);
          }
          addLicense(a) {
            const r = this.tableCrud
              .getAll(d)
              .filter((a) => "" === a.phone || null == a.phone);
            if (r.length > 0) {
              let i = r[0];
              const o = {
                data: {
                  id: i.id,
                  phone: a.phone,
                  email: a.email,
                  expiryDate: a.expiryDate,
                },
              };
              return (
                this.sendEmail.sendEmailThongBao(
                  "Mua license thành công",
                  `\n            Số điện thoại : ${
                    a.phone
                  } <br>\n            Ngày hết hạn: ${
                    a.expiryDate
                  }<br>\n            LICENSE=${
                    this.cryptojs.encrypt(i.id).data
                  } <br>\n            Vui lòng xem video này và làm theo hướng dẫn : <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">Link hướng dẫn</a>  <br>\n      `,
                  a.email
                ),
                this.tableCrud.add(d, o),
                this.sendEmail.sendEmailThongBao(
                  "Khách hàng mua license thành công",
                  `\n      Số license còn lại : ${
                    r.length - 1
                  } <br>\n      Thông tin khách hàng:  ${JSON.stringify(a)}`,
                  "k40cntt@gmail.com"
                ),
                { status: "SUCCESS", data: null, msg: "Đăng ký thành công" }
              );
            }
            return (
              this.sendEmail.sendEmailThongBao(
                "Google Sheet License đã hết",
                "Thông tin khách hàng: " + JSON.stringify(a),
                "k40cntt@gmail.com"
              ),
              {
                status: "FAILED",
                data: a,
                msg: "Vui lòng liên hệ quản trị viên để tạo thêm Sheet",
              }
            );
          }
        })(U, M, O),
        j = new c(),
        P = new (class {
          constructor() {}
          login(a = "", r = "") {
            const i = this.createJwt({
              privateKey: x,
              expiresInHours: 6,
              data: {
                iss: Session.getActiveUser().getEmail(),
                userId: 123,
                name: "Amit Agarwal",
              },
            });
            return (
              Logger.log(i),
              {
                access_token: i,
                expires_in: 86400,
                token_type: "Bearer",
                scope: "PublicApi.Access",
              }
            );
          }
          information(a = "") {
            return this.parseJwt(a, x);
          }
          parseJwt(a, r) {
            const [i, o, s] = a.split("."),
              l = Utilities.computeHmacSha256Signature(`${i}.${o}`, r);
            if (s === Utilities.base64EncodeWebSafe(l).replace(/=+$/, "")) {
              const a = Utilities.newBlob(
                  Utilities.base64Decode(o)
                ).getDataAsString(),
                r = JSON.parse(a),
                { exp: i } = r,
                s = (function (a, r) {
                  if (null == a) return {};
                  var i,
                    o,
                    s = {},
                    l = Object.keys(a);
                  for (o = 0; o < l.length; o++)
                    (i = l[o]), r.indexOf(i) >= 0 || (s[i] = a[i]);
                  return s;
                })(r, v);
              return new Date(1e3 * i) < new Date()
                ? { msg: "The token has expired" }
                : (Logger.log(s), s);
            }
            return (
              Logger.log("🔴", "Invalid Signature"),
              { msg: "Invalid Signature" }
            );
          }
          createJwt({ privateKey: a, expiresInHours: r, data: i = {} }) {
            const o = Date.now(),
              s = new Date(o);
            s.setHours(s.getHours() + r);
            const l = {
              exp: Math.round(s.getTime() / 1e3),
              iat: Math.round(o / 1e3),
            };
            Object.keys(i).forEach(function (a) {
              l[a] = i[a];
            });
            const base64Encode = (a, r = !0) => {
                const i = r ? JSON.stringify(a) : a;
                return Utilities.base64EncodeWebSafe(i).replace(/=+$/, "");
              },
              d = `${base64Encode({ alg: "HS256", typ: "JWT" })}.${base64Encode(
                l
              )}`;
            return `${d}.${base64Encode(
              Utilities.computeHmacSha256Signature(d, a),
              !1
            )}`;
          }
        })(),
        W = new f(),
        R = new (class {
          constructor() {}
          getAll() {
            return ScriptApp.getProjectTriggers().map((a) => ({
              uniqueId: a.getUniqueId(),
              handlerFunction: a.getHandlerFunction(),
              eventType: a.getEventType(),
              triggerSource: a.getTriggerSource(),
              triggerSourceId: a.getTriggerSourceId(),
            }));
          }
          syncProductKiotViet() {
            return jobSyncProductKiotViet();
          }
        })(),
        q = new (class {
          constructor() {}
          getConfigFromPortal(a = "", r = "") {
            const i = UrlFetchApp.fetch(`${r}/config-apps/app/${a}`, {
              method: "get",
              muteHttpExceptions: !0,
            }).getContentText();
            new h().log(i);
            try {
              return JSON.parse(i);
            } catch (a) {
              return { error: "Data cannot found" };
            }
          }
          getConfigByDomain(a = "") {
            return E[a]
              ? this.getConfigByRetailer(E[a])
              : { error: "Data cannot found" };
          }
          getConfigByRetailer(a = "", r = "") {
            let i = null;
            const o = (a || "").toLowerCase();
            if (D[o]) i = D[o];
            else {
              const { firebase: o, sheetId: s } = this.getConfigFromPortal(
                a,
                r
              );
              if (o && s)
                try {
                  i = { firebase: JSON.parse(o), sheetId: s };
                } catch (a) {}
            }
            if (null === i) return { error: "Data cannot found" };
            {
              const a = new l(i.firebase.databaseURL),
                { idToken: r } = this.loginUser(z, N, i.firebase.apiKey);
              if (r) return i;
              {
                const { localId: r, idToken: o } = this.createUser(
                    z,
                    N,
                    i.firebase.apiKey
                  ),
                  s = {
                    active: !0,
                    address: "Support",
                    date: "1995-12-11T17:00:00.000Z",
                    deleted: !1,
                    displayName: "Support",
                    email: z,
                    emailVerified: !1,
                    id: "ADMIN",
                    passport: "0981773084",
                    phone: "0981773084",
                    photoURL: "assets/pets/default-avatar.jpg",
                    role: "SUPPER_ADMIN",
                    seqNo: new Date().getTime(),
                    sync: !0,
                    uid: r,
                  };
                return a.updateById("USERS", "ADMIN", s, o), i;
              }
            }
          }
          loginUser(a = "", r = "", i = "") {
            const o =
                "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
                i,
              s = { email: a, password: r, returnSecureToken: !0 },
              l = {
                method: "post",
                contentType: "application/json",
                payload: JSON.stringify(s),
                muteHttpExceptions: !0,
              },
              d = UrlFetchApp.fetch(o, l),
              c = JSON.parse(d.getContentText());
            return (
              c.idToken ||
                Logger.log("Authentication failed. Error: " + c.error.message),
              c
            );
          }
          createUser(a = "", r = "", i = "") {
            const o = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${i}`,
              s = JSON.stringify({
                email: a,
                password: r,
                returnSecureToken: !0,
              }),
              l = UrlFetchApp.fetch(o, {
                method: "post",
                contentType: "application/json",
                muteHttpExceptions: !0,
                payload: s,
              });
            return JSON.parse(l.getContentText());
          }
        })(),
        J = new (class {
          setColorCalendar(a = "", r = "") {
            this.getCalendar(a).setColor(r);
          }
          createEventCustom(
            a = "",
            r = {
              title: "",
              start: new Date(),
              end: new Date(),
              colorId: "",
              options: { description: "", location: "" },
            }
          ) {
            const i = this.getCalendar(a).createEvent(
              r.title,
              new Date(r.start),
              new Date(r.end),
              r.options
            );
            r.colorId && i.setColor(r.colorId);
          }
          getCalendar(a = "") {
            const r = CalendarApp.getCalendarsByName(a);
            if (r.length > 0) return r[0];
            return CalendarApp.createCalendar(a);
          }
          getRangeEvents(a = "", r = { startTime: "", endTime: "" }) {
            return this.getCalendar(a)
              .getEvents(new Date(r.startTime), new Date(r.endTime))
              .map((a) => ({
                id: a.getId(),
                title: a.getTitle(),
                start: a.getStartTime(),
                end: a.getEndTime(),
                colorId: a.getColor(),
                location: a.getLocation(),
                description: a.getDescription(),
                originalCalendarId: a.getOriginalCalendarId(),
                lastUpdated: a.getLastUpdated(),
                createdAt: a.getDateCreated(),
              }));
          }
        })(),
        X = new (class {
          constructor() {}
          exportExcel(
            a = { data: [] },
            r = [{ key: "", value: "" }],
            i = "file name"
          ) {
            const o = i,
              s = SpreadsheetApp.create(o);
            let l = [],
              d = r.map((a) => a.key),
              c = r.map((a) => a.value);
            l = a.data;
            let p = s.getActiveSheet();
            p.getRange(1, 1, 1, d.length).setValues([c]);
            const g = d.reduce((a, r, i) => ((a[i] = r), a), {}),
              h = [];
            for (let a = 0; a < l.length; a++) {
              const r = Object.keys(g)
                .map((a) => Number(a))
                .sort((a, r) => a - r)
                .map((r) => l[a][g[r]]);
              h.push(r);
            }
            const u = p
              .getRange(p.getMaxRows(), 1)
              .getNextDataCell(SpreadsheetApp.Direction.UP)
              .getRow();
            p.insertRows(p.getLastRow() + 1, h.length);
            const f = p.getRange(u + 1, 1, h.length, d.length);
            f.setNumberFormat("@"), f.setValues(h);
            const b = this.getStoreReport(),
              m = s.getId(),
              y = DriveApp.getFileById(m)
                .moveTo(b)
                .setSharing(
                  DriveApp.Access.ANYONE_WITH_LINK,
                  DriveApp.Permission.VIEW
                )
                .getId();
            return {
              view: `https://docs.google.com/spreadsheets/d/${y}/edit?usp=sharing`,
              download: `https://docs.google.com/spreadsheets/d/${y}/export?format=xlsx&gid=0`,
            };
          }
          getStoreReport() {
            const a = "REPORT_EXCEL_TEMP",
              r = DriveApp.getRootFolder(),
              i = r.getFoldersByName(a);
            if (i.hasNext()) return Logger.log("Thư mục đã tồn tại."), i.next();
            {
              Logger.log("Thư mục chưa tồn tại. Đang tạo mới...");
              const i = r.createFolder(a);
              return Logger.log("Thư mục đã được tạo mới."), i;
            }
          }
        })(),
        G = new (class {
          getLicense(a = "") {
            const r = {
                method: "post",
                payload: JSON.stringify({
                  actionType: "GET",
                  table: "MANAGER_SHEET",
                  seqNo: 0,
                }),
                muteHttpExceptions: !0,
              },
              i = UrlFetchApp.fetch(
                "https://script.google.com/macros/s/AKfycbxB-8oQowVVDen9WhD44QEja8cm_lFtQc3Sc_0dCEHkNhCFzo8hTlNVUCkagA6ms5cGKg/exec",
                r
              );
            try {
              return JSON.parse(i.getContentText()).filter((r) => r.id === a);
            } catch (a) {
              return [];
            }
          }
        })(),
        V = __webpack_require__(194),
        K = {
          encrypt: (a) => {
            const { text: r } = a;
            return O.encrypt(r);
          },
          decrypt: (a) => {
            const { text: r } = a;
            return O.decrypt(r);
          },
          SEND_OTP: (a) => M.sendOtp(a),
          SEND_EMAIL: (a) => {
            const { recipient: r, subject: i, body: o } = a;
            return M.sendEmail(r, i, o);
          },
          getById: (a) => {
            const { id: r, table: i } = a;
            return U.getById(i, r);
          },
          addAll: (a) => {
            const { table: r, sheetId: i } = a;
            if (i && r.endsWith("_MANAGER_TASK")) {
              const a = /\/s\/(.*?)\/exec/,
                i = ScriptApp.getService().getUrl().match(a);
              let o = "";
              i && i[1] && (o = i[1]);
              const s = {
                id: "UPDATE_TASK",
                actionType: "ADD_TASK",
                phone: (r || "").split("_").shift(),
                sheetId: o,
              };
              H.updateById("MANAGER_TASK", "UPDATE_TASK", s);
            }
            return U.addAll(r, a);
          },
          POST: (a) => {
            const { table: r, sheetId: i } = a;
            if (i && r.endsWith("_MANAGER_TASK")) {
              const a = /\/s\/(.*?)\/exec/,
                i = ScriptApp.getService().getUrl().match(a);
              let o = "";
              i && i[1] && (o = i[1]);
              const s = {
                id: "UPDATE_TASK",
                actionType: "ADD_TASK",
                phone: (r || "").split("_").shift(),
                sheetId: o,
              };
              H.updateById("MANAGER_TASK", "UPDATE_TASK", s);
            }
            return U.add(r, a);
          },
          GET: (a) => {
            const { table: r, seqNo: i } = a;
            return void 0 === i
              ? U.getAll(r)
              : U.getAll(r).filter((a) => a.seqNo > i);
          },
          UPLOAD: (a) => U.upload(a),
          DATABASES: (a) => {
            const { tables: r } = a;
            return U.databases(r);
          },
          DELETE: (a) => {
            const { id: r, table: i } = a;
            return U.delete(i, r);
          },
          CLEAR: (a) => {
            const { table: r } = a;
            return U.clear(r);
          },
          ZALO: (a) => U.zalo(a),
          FIREBASE: (a) => {
            const { table: r, data: i } = a;
            return H.addAll(r, i);
          },
          FIREBASE_addAll: (a) => {
            const { table: r, data: i } = a;
            return H.addAll(r, i);
          },
          FIREBASE_add: (a) => {
            const { table: r, data: i } = a;
            return H.addAll(r, [i]);
          },
          FIREBASE_getAll: (a) => {
            const { table: r } = a;
            return H.getAll(r);
          },
          FIREBASE_getById: (a) => {
            const { table: r, id: i } = a;
            return H.getById(r, i);
          },
          FIREBASE_deleteById: (a) => {
            const { table: r, id: i } = a;
            return H.deleteById(r, i);
          },
          FIREBASE_updateById: (a) => {
            const { table: r, data: i } = a;
            return H.updateById(r, i.id, i);
          },
          FIREBASE_getBySeqNo: (a) => {
            const { table: r, seqNo: i } = a;
            return H.getBySeqNo(r, i);
          },
          LICENSE: (a) => L.addLicense(a),
          CONTRACT: (a) => {
            const { data: r } = a;
            return j.addContact(r);
          },
          addContact: (a) => j.addContact(),
          ecommerce: (a) => {
            const r = new g(),
              { data: i, method: o } = a;
            if ("invoiceInApp" === o) return { data: V.pack(i) };
            if ("invoice" === o) {
              const { jwt: o } = a;
              return r.createInvoice(i, o);
            }
            if ("forWordCall" === o) return r.forWordCall(i);
            if ("getToken" === o) {
              const { client_id: a, client_secret: o } = i;
              return r.getToken(a, o);
            }
            if ("config" === o) {
              const { key: a, value: o } = i;
              return r.config(a, o);
            }
            if ("invoiceLastModifiedFrom" === o) {
              const { jwt: o } = a,
                { lastModifiedFrom: s } = i;
              return r.invoiceLastModifiedFrom(o, s);
            }
          },
          api: (a) => {
            const { method: r, access_token: i } = a;
            return "login" === r
              ? P.login()
              : "information" === r
              ? P.information(i)
              : void 0;
          },
          cloud: (a) => {
            const { databaseName: r, tableName: i, method: o, data: s } = a;
            if ("insert" === o || "update" === o) {
              if ((i || "").startsWith("SERVER_LOG_")) {
                const a = new h();
                try {
                  const r = {
                    userName: s.userInfo.displayName,
                    email: s.userInfo.email,
                    tableName: i,
                    id: s.id,
                    msg: (s.message || "").substring(0, 255),
                  };
                  a.log(JSON.stringify(r)), U.add(i, { data: s });
                } catch (a) {}
              }
              return Array.isArray(s) ? W.insert(r, i, s) : W.insert(r, i, [s]);
            }
            if ("getAll" === o) {
              const { pagination: o } = a;
              return W.getAll(r, i, o);
            }
            if ("delete" === o) {
              const { ids: o } = a;
              return W.delete(r, i, o);
            }
            if ("getBySeqNo" === o) {
              const { seqNo: o } = a;
              return W.getBySeqNo(r, i, o);
            }
          },
          schedule: (a) => {
            const { method: r } = a;
            return "getAll" === r
              ? R.getAll()
              : "job-sync-product" === r
              ? R.syncProductKiotViet()
              : void 0;
          },
          portal: (a) => {
            const { method: r } = a;
            if ("getConfigByRetailer" === r) {
              const { data: r, rootUrl: i } = a;
              return q.getConfigByRetailer(r.retailer, i);
            }
            if ("getConfigByDomain" === r) {
              const { data: r } = a;
              return q.getConfigByDomain(r.domain);
            }
            if ("import-user" === r) {
              const { data: r, apiKey: i, url: o } = a;
              for (let a = 0; a < r.length; a++) {
                const { email: o } = r[a],
                  { idToken: s, localId: l } = q.loginUser(o, "Vetgo@123", i);
                if (s) r[a].uid = l;
                else {
                  const { localId: s } = q.createUser(o, "Vetgo@123", i);
                  r[a].uid = s;
                }
              }
              return new l(o).addAll("USERS", r);
            }
            if ("import-data" === r) {
              const { data: r, table: i, url: o } = a;
              return new l(o).addAll(i, r);
            }
          },
          calendar: (a) => {
            const { method: r, calendarName: i } = a;
            if ("setColorCalendar" === r) {
              const { data: r } = a,
                { color: o } = r;
              return J.setColorCalendar(i, o);
            }
            if ("createEventCustom" === r) {
              const { data: r } = a,
                o = {
                  title: r.title,
                  start: new Date(r.start),
                  end: new Date(r.end),
                  colorId: r.colorId,
                  options: r.options,
                };
              return J.createEventCustom(i, o);
            }
          },
          export_excel: (a) => {
            const { method: r } = a;
            if ("export" === r) {
              const { data: r, fileName: i, header: o } = a;
              return X.exportExcel({ data: r }, o, i);
            }
          },
          zalo_task: (a) => {
            const { method: r, calendarName: i } = a;
            if ("getRangeEvents" === r) {
              const { data: r } = a;
              return J.getRangeEvents(i, r);
            }
            if ("updateConfig" === r) {
              const { data: r } = a;
              return H.updateById("config_mapping", r.id, r);
            }
            if ("license" === r) {
              const a = getDeploymentId();
              return G.getLicense(a);
            }
          },
        };
      const controller_router = function (a) {
          try {
            let r = JSON.parse(a.postData.contents);
            const i = r[Utilities.base64Encode("payload").replace("==", "")];
            if (i) {
              const a = getDeploymentId(),
                { data: o } = O.decrypt(i, a);
              r = JSON.parse(o);
            }
            r.Attempt && 1 === r.Attempt && webHook(r);
            const { actionType: o } = r;
            if (K[o]) {
              let a = K[o](r);
              if (i) {
                const r = getDeploymentId();
                a = {
                  [Utilities.base64Encode("payload").replace("==", "")]:
                    O.encrypt(JSON.stringify(a), r).data,
                };
              }
              return ContentService.createTextOutput(
                JSON.stringify(a)
              ).setMimeType(ContentService.MimeType.JSON);
            }
            return ContentService.createTextOutput(
              JSON.stringify({ msg: "Action not found" })
            ).setMimeType(ContentService.MimeType.JSON);
          } catch (a) {
            return ContentService.createTextOutput(a);
          }
        },
        Y = "MANAGER_CONFIG_SHEET",
        Z =
          (ScriptApp.getScriptId(),
          {
            109e3: "MOBIFONE",
            109100: "VINAPHONE",
            109200: "VIETNAMMB",
            109300: "ITEL",
            109800: "VIETTEL",
            109900: "GTEL",
            109400: "REDDI",
          });
      function removeAccents(a) {
        const r = [
          "aàảãáạăằẳẵắặâầẩẫấậ",
          "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
          "dđ",
          "DĐ",
          "eèẻẽéẹêềểễếệ",
          "EÈẺẼÉẸÊỀỂỄẾỆ",
          "iìỉĩíị",
          "IÌỈĨÍỊ",
          "oòỏõóọôồổỗốộơờởỡớợ",
          "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
          "uùủũúụưừửữứự",
          "UÙỦŨÚỤƯỪỬỮỨỰ",
          "yỳỷỹýỵ",
          "YỲỶỸÝỴ",
        ];
        for (let i = 0; i < r.length; i++) {
          const o = new RegExp("[" + r[i].substr(1) + "]", "g"),
            s = r[i][0];
          a = String(a || "").replace(o, s);
        }
        return a;
      }
      function addDays(a, r) {
        requiredArgs(2, arguments);
        var i = toDate(a),
          o = toInteger(r);
        return isNaN(o)
          ? new Date(NaN)
          : o
          ? (i.setDate(i.getDate() + o), i)
          : i;
      }
      function startOfDay(a) {
        requiredArgs(1, arguments);
        var r = toDate(a);
        return r.setHours(0, 0, 0, 0), r;
      }
      function isTomorrow(a) {
        return (
          requiredArgs(1, arguments),
          (function (a, r) {
            requiredArgs(2, arguments);
            var i = startOfDay(a),
              o = startOfDay(r);
            return i.getTime() === o.getTime();
          })(a, addDays(Date.now(), 1))
        );
      }
      function isValid(a) {
        if (
          (requiredArgs(1, arguments),
          !(function (a) {
            return (
              requiredArgs(1, arguments),
              a instanceof Date ||
                ("object" === _typeof(a) &&
                  "[object Date]" === Object.prototype.toString.call(a))
            );
          })(a) && "number" != typeof a)
        )
          return !1;
        var r = toDate(a);
        return !isNaN(Number(r));
      }
      function startOfUTCISOWeek(a) {
        requiredArgs(1, arguments);
        var r = toDate(a),
          i = r.getUTCDay(),
          o = (i < 1 ? 7 : 0) + i - 1;
        return r.setUTCDate(r.getUTCDate() - o), r.setUTCHours(0, 0, 0, 0), r;
      }
      function getUTCISOWeekYear(a) {
        requiredArgs(1, arguments);
        var r = toDate(a),
          i = r.getUTCFullYear(),
          o = new Date(0);
        o.setUTCFullYear(i + 1, 0, 4), o.setUTCHours(0, 0, 0, 0);
        var s = startOfUTCISOWeek(o),
          l = new Date(0);
        l.setUTCFullYear(i, 0, 4), l.setUTCHours(0, 0, 0, 0);
        var d = startOfUTCISOWeek(l);
        return r.getTime() >= s.getTime()
          ? i + 1
          : r.getTime() >= d.getTime()
          ? i
          : i - 1;
      }
      function getUTCISOWeek(a) {
        requiredArgs(1, arguments);
        var r = toDate(a),
          i =
            startOfUTCISOWeek(r).getTime() -
            (function (a) {
              requiredArgs(1, arguments);
              var r = getUTCISOWeekYear(a),
                i = new Date(0);
              return (
                i.setUTCFullYear(r, 0, 4),
                i.setUTCHours(0, 0, 0, 0),
                startOfUTCISOWeek(i)
              );
            })(r).getTime();
        return Math.round(i / 6048e5) + 1;
      }
      var Q = {};
      function getDefaultOptions() {
        return Q;
      }
      function startOfUTCWeek(a, r) {
        var i, o, s, l, d, c, p, g;
        requiredArgs(1, arguments);
        var h = getDefaultOptions(),
          u = toInteger(
            null !==
              (i =
                null !==
                  (o =
                    null !==
                      (s =
                        null !== (l = null == r ? void 0 : r.weekStartsOn) &&
                        void 0 !== l
                          ? l
                          : null == r ||
                            null === (d = r.locale) ||
                            void 0 === d ||
                            null === (c = d.options) ||
                            void 0 === c
                          ? void 0
                          : c.weekStartsOn) && void 0 !== s
                      ? s
                      : h.weekStartsOn) && void 0 !== o
                  ? o
                  : null === (p = h.locale) ||
                    void 0 === p ||
                    null === (g = p.options) ||
                    void 0 === g
                  ? void 0
                  : g.weekStartsOn) && void 0 !== i
              ? i
              : 0
          );
        if (!(u >= 0 && u <= 6))
          throw new RangeError(
            "weekStartsOn must be between 0 and 6 inclusively"
          );
        var f = toDate(a),
          b = f.getUTCDay(),
          m = (b < u ? 7 : 0) + b - u;
        return f.setUTCDate(f.getUTCDate() - m), f.setUTCHours(0, 0, 0, 0), f;
      }
      function getUTCWeekYear(a, r) {
        var i, o, s, l, d, c, p, g;
        requiredArgs(1, arguments);
        var h = toDate(a),
          u = h.getUTCFullYear(),
          f = getDefaultOptions(),
          b = toInteger(
            null !==
              (i =
                null !==
                  (o =
                    null !==
                      (s =
                        null !==
                          (l = null == r ? void 0 : r.firstWeekContainsDate) &&
                        void 0 !== l
                          ? l
                          : null == r ||
                            null === (d = r.locale) ||
                            void 0 === d ||
                            null === (c = d.options) ||
                            void 0 === c
                          ? void 0
                          : c.firstWeekContainsDate) && void 0 !== s
                      ? s
                      : f.firstWeekContainsDate) && void 0 !== o
                  ? o
                  : null === (p = f.locale) ||
                    void 0 === p ||
                    null === (g = p.options) ||
                    void 0 === g
                  ? void 0
                  : g.firstWeekContainsDate) && void 0 !== i
              ? i
              : 1
          );
        if (!(b >= 1 && b <= 7))
          throw new RangeError(
            "firstWeekContainsDate must be between 1 and 7 inclusively"
          );
        var m = new Date(0);
        m.setUTCFullYear(u + 1, 0, b), m.setUTCHours(0, 0, 0, 0);
        var y = startOfUTCWeek(m, r),
          w = new Date(0);
        w.setUTCFullYear(u, 0, b), w.setUTCHours(0, 0, 0, 0);
        var v = startOfUTCWeek(w, r);
        return h.getTime() >= y.getTime()
          ? u + 1
          : h.getTime() >= v.getTime()
          ? u
          : u - 1;
      }
      function getUTCWeek(a, r) {
        requiredArgs(1, arguments);
        var i = toDate(a),
          o =
            startOfUTCWeek(i, r).getTime() -
            (function (a, r) {
              var i, o, s, l, d, c, p, g;
              requiredArgs(1, arguments);
              var h = getDefaultOptions(),
                u = toInteger(
                  null !==
                    (i =
                      null !==
                        (o =
                          null !==
                            (s =
                              null !==
                                (l =
                                  null == r
                                    ? void 0
                                    : r.firstWeekContainsDate) && void 0 !== l
                                ? l
                                : null == r ||
                                  null === (d = r.locale) ||
                                  void 0 === d ||
                                  null === (c = d.options) ||
                                  void 0 === c
                                ? void 0
                                : c.firstWeekContainsDate) && void 0 !== s
                            ? s
                            : h.firstWeekContainsDate) && void 0 !== o
                        ? o
                        : null === (p = h.locale) ||
                          void 0 === p ||
                          null === (g = p.options) ||
                          void 0 === g
                        ? void 0
                        : g.firstWeekContainsDate) && void 0 !== i
                    ? i
                    : 1
                ),
                f = getUTCWeekYear(a, r),
                b = new Date(0);
              return (
                b.setUTCFullYear(f, 0, u),
                b.setUTCHours(0, 0, 0, 0),
                startOfUTCWeek(b, r)
              );
            })(i, r).getTime();
        return Math.round(o / 6048e5) + 1;
      }
      function addLeadingZeros(a, r) {
        for (
          var i = a < 0 ? "-" : "", o = Math.abs(a).toString();
          o.length < r;

        )
          o = "0" + o;
        return i + o;
      }
      const $ = {
        y: function (a, r) {
          var i = a.getUTCFullYear(),
            o = i > 0 ? i : 1 - i;
          return addLeadingZeros("yy" === r ? o % 100 : o, r.length);
        },
        M: function (a, r) {
          var i = a.getUTCMonth();
          return "M" === r ? String(i + 1) : addLeadingZeros(i + 1, 2);
        },
        d: function (a, r) {
          return addLeadingZeros(a.getUTCDate(), r.length);
        },
        a: function (a, r) {
          var i = a.getUTCHours() / 12 >= 1 ? "pm" : "am";
          switch (r) {
            case "a":
            case "aa":
              return i.toUpperCase();
            case "aaa":
              return i;
            case "aaaaa":
              return i[0];
            default:
              return "am" === i ? "a.m." : "p.m.";
          }
        },
        h: function (a, r) {
          return addLeadingZeros(a.getUTCHours() % 12 || 12, r.length);
        },
        H: function (a, r) {
          return addLeadingZeros(a.getUTCHours(), r.length);
        },
        m: function (a, r) {
          return addLeadingZeros(a.getUTCMinutes(), r.length);
        },
        s: function (a, r) {
          return addLeadingZeros(a.getUTCSeconds(), r.length);
        },
        S: function (a, r) {
          var i = r.length,
            o = a.getUTCMilliseconds();
          return addLeadingZeros(Math.floor(o * Math.pow(10, i - 3)), r.length);
        },
      };
      var tt = "midnight",
        et = "noon",
        nt = "morning",
        at = "afternoon",
        rt = "evening",
        it = "night",
        ot = {
          G: function (a, r, i) {
            var o = a.getUTCFullYear() > 0 ? 1 : 0;
            switch (r) {
              case "G":
              case "GG":
              case "GGG":
                return i.era(o, { width: "abbreviated" });
              case "GGGGG":
                return i.era(o, { width: "narrow" });
              default:
                return i.era(o, { width: "wide" });
            }
          },
          y: function (a, r, i) {
            if ("yo" === r) {
              var o = a.getUTCFullYear(),
                s = o > 0 ? o : 1 - o;
              return i.ordinalNumber(s, { unit: "year" });
            }
            return $.y(a, r);
          },
          Y: function (a, r, i, o) {
            var s = getUTCWeekYear(a, o),
              l = s > 0 ? s : 1 - s;
            return "YY" === r
              ? addLeadingZeros(l % 100, 2)
              : "Yo" === r
              ? i.ordinalNumber(l, { unit: "year" })
              : addLeadingZeros(l, r.length);
          },
          R: function (a, r) {
            return addLeadingZeros(getUTCISOWeekYear(a), r.length);
          },
          u: function (a, r) {
            return addLeadingZeros(a.getUTCFullYear(), r.length);
          },
          Q: function (a, r, i) {
            var o = Math.ceil((a.getUTCMonth() + 1) / 3);
            switch (r) {
              case "Q":
                return String(o);
              case "QQ":
                return addLeadingZeros(o, 2);
              case "Qo":
                return i.ordinalNumber(o, { unit: "quarter" });
              case "QQQ":
                return i.quarter(o, {
                  width: "abbreviated",
                  context: "formatting",
                });
              case "QQQQQ":
                return i.quarter(o, { width: "narrow", context: "formatting" });
              default:
                return i.quarter(o, { width: "wide", context: "formatting" });
            }
          },
          q: function (a, r, i) {
            var o = Math.ceil((a.getUTCMonth() + 1) / 3);
            switch (r) {
              case "q":
                return String(o);
              case "qq":
                return addLeadingZeros(o, 2);
              case "qo":
                return i.ordinalNumber(o, { unit: "quarter" });
              case "qqq":
                return i.quarter(o, {
                  width: "abbreviated",
                  context: "standalone",
                });
              case "qqqqq":
                return i.quarter(o, { width: "narrow", context: "standalone" });
              default:
                return i.quarter(o, { width: "wide", context: "standalone" });
            }
          },
          M: function (a, r, i) {
            var o = a.getUTCMonth();
            switch (r) {
              case "M":
              case "MM":
                return $.M(a, r);
              case "Mo":
                return i.ordinalNumber(o + 1, { unit: "month" });
              case "MMM":
                return i.month(o, {
                  width: "abbreviated",
                  context: "formatting",
                });
              case "MMMMM":
                return i.month(o, { width: "narrow", context: "formatting" });
              default:
                return i.month(o, { width: "wide", context: "formatting" });
            }
          },
          L: function (a, r, i) {
            var o = a.getUTCMonth();
            switch (r) {
              case "L":
                return String(o + 1);
              case "LL":
                return addLeadingZeros(o + 1, 2);
              case "Lo":
                return i.ordinalNumber(o + 1, { unit: "month" });
              case "LLL":
                return i.month(o, {
                  width: "abbreviated",
                  context: "standalone",
                });
              case "LLLLL":
                return i.month(o, { width: "narrow", context: "standalone" });
              default:
                return i.month(o, { width: "wide", context: "standalone" });
            }
          },
          w: function (a, r, i, o) {
            var s = getUTCWeek(a, o);
            return "wo" === r
              ? i.ordinalNumber(s, { unit: "week" })
              : addLeadingZeros(s, r.length);
          },
          I: function (a, r, i) {
            var o = getUTCISOWeek(a);
            return "Io" === r
              ? i.ordinalNumber(o, { unit: "week" })
              : addLeadingZeros(o, r.length);
          },
          d: function (a, r, i) {
            return "do" === r
              ? i.ordinalNumber(a.getUTCDate(), { unit: "date" })
              : $.d(a, r);
          },
          D: function (a, r, i) {
            var o = (function (a) {
              requiredArgs(1, arguments);
              var r = toDate(a),
                i = r.getTime();
              r.setUTCMonth(0, 1), r.setUTCHours(0, 0, 0, 0);
              var o = i - r.getTime();
              return Math.floor(o / 864e5) + 1;
            })(a);
            return "Do" === r
              ? i.ordinalNumber(o, { unit: "dayOfYear" })
              : addLeadingZeros(o, r.length);
          },
          E: function (a, r, i) {
            var o = a.getUTCDay();
            switch (r) {
              case "E":
              case "EE":
              case "EEE":
                return i.day(o, {
                  width: "abbreviated",
                  context: "formatting",
                });
              case "EEEEE":
                return i.day(o, { width: "narrow", context: "formatting" });
              case "EEEEEE":
                return i.day(o, { width: "short", context: "formatting" });
              default:
                return i.day(o, { width: "wide", context: "formatting" });
            }
          },
          e: function (a, r, i, o) {
            var s = a.getUTCDay(),
              l = (s - o.weekStartsOn + 8) % 7 || 7;
            switch (r) {
              case "e":
                return String(l);
              case "ee":
                return addLeadingZeros(l, 2);
              case "eo":
                return i.ordinalNumber(l, { unit: "day" });
              case "eee":
                return i.day(s, {
                  width: "abbreviated",
                  context: "formatting",
                });
              case "eeeee":
                return i.day(s, { width: "narrow", context: "formatting" });
              case "eeeeee":
                return i.day(s, { width: "short", context: "formatting" });
              default:
                return i.day(s, { width: "wide", context: "formatting" });
            }
          },
          c: function (a, r, i, o) {
            var s = a.getUTCDay(),
              l = (s - o.weekStartsOn + 8) % 7 || 7;
            switch (r) {
              case "c":
                return String(l);
              case "cc":
                return addLeadingZeros(l, r.length);
              case "co":
                return i.ordinalNumber(l, { unit: "day" });
              case "ccc":
                return i.day(s, {
                  width: "abbreviated",
                  context: "standalone",
                });
              case "ccccc":
                return i.day(s, { width: "narrow", context: "standalone" });
              case "cccccc":
                return i.day(s, { width: "short", context: "standalone" });
              default:
                return i.day(s, { width: "wide", context: "standalone" });
            }
          },
          i: function (a, r, i) {
            var o = a.getUTCDay(),
              s = 0 === o ? 7 : o;
            switch (r) {
              case "i":
                return String(s);
              case "ii":
                return addLeadingZeros(s, r.length);
              case "io":
                return i.ordinalNumber(s, { unit: "day" });
              case "iii":
                return i.day(o, {
                  width: "abbreviated",
                  context: "formatting",
                });
              case "iiiii":
                return i.day(o, { width: "narrow", context: "formatting" });
              case "iiiiii":
                return i.day(o, { width: "short", context: "formatting" });
              default:
                return i.day(o, { width: "wide", context: "formatting" });
            }
          },
          a: function (a, r, i) {
            var o = a.getUTCHours() / 12 >= 1 ? "pm" : "am";
            switch (r) {
              case "a":
              case "aa":
                return i.dayPeriod(o, {
                  width: "abbreviated",
                  context: "formatting",
                });
              case "aaa":
                return i
                  .dayPeriod(o, { width: "abbreviated", context: "formatting" })
                  .toLowerCase();
              case "aaaaa":
                return i.dayPeriod(o, {
                  width: "narrow",
                  context: "formatting",
                });
              default:
                return i.dayPeriod(o, { width: "wide", context: "formatting" });
            }
          },
          b: function (a, r, i) {
            var o,
              s = a.getUTCHours();
            switch (
              ((o = 12 === s ? et : 0 === s ? tt : s / 12 >= 1 ? "pm" : "am"),
              r)
            ) {
              case "b":
              case "bb":
                return i.dayPeriod(o, {
                  width: "abbreviated",
                  context: "formatting",
                });
              case "bbb":
                return i
                  .dayPeriod(o, { width: "abbreviated", context: "formatting" })
                  .toLowerCase();
              case "bbbbb":
                return i.dayPeriod(o, {
                  width: "narrow",
                  context: "formatting",
                });
              default:
                return i.dayPeriod(o, { width: "wide", context: "formatting" });
            }
          },
          B: function (a, r, i) {
            var o,
              s = a.getUTCHours();
            switch (((o = s >= 17 ? rt : s >= 12 ? at : s >= 4 ? nt : it), r)) {
              case "B":
              case "BB":
              case "BBB":
                return i.dayPeriod(o, {
                  width: "abbreviated",
                  context: "formatting",
                });
              case "BBBBB":
                return i.dayPeriod(o, {
                  width: "narrow",
                  context: "formatting",
                });
              default:
                return i.dayPeriod(o, { width: "wide", context: "formatting" });
            }
          },
          h: function (a, r, i) {
            if ("ho" === r) {
              var o = a.getUTCHours() % 12;
              return 0 === o && (o = 12), i.ordinalNumber(o, { unit: "hour" });
            }
            return $.h(a, r);
          },
          H: function (a, r, i) {
            return "Ho" === r
              ? i.ordinalNumber(a.getUTCHours(), { unit: "hour" })
              : $.H(a, r);
          },
          K: function (a, r, i) {
            var o = a.getUTCHours() % 12;
            return "Ko" === r
              ? i.ordinalNumber(o, { unit: "hour" })
              : addLeadingZeros(o, r.length);
          },
          k: function (a, r, i) {
            var o = a.getUTCHours();
            return (
              0 === o && (o = 24),
              "ko" === r
                ? i.ordinalNumber(o, { unit: "hour" })
                : addLeadingZeros(o, r.length)
            );
          },
          m: function (a, r, i) {
            return "mo" === r
              ? i.ordinalNumber(a.getUTCMinutes(), { unit: "minute" })
              : $.m(a, r);
          },
          s: function (a, r, i) {
            return "so" === r
              ? i.ordinalNumber(a.getUTCSeconds(), { unit: "second" })
              : $.s(a, r);
          },
          S: function (a, r) {
            return $.S(a, r);
          },
          X: function (a, r, i, o) {
            var s = (o._originalDate || a).getTimezoneOffset();
            if (0 === s) return "Z";
            switch (r) {
              case "X":
                return formatTimezoneWithOptionalMinutes(s);
              case "XXXX":
              case "XX":
                return formatTimezone(s);
              default:
                return formatTimezone(s, ":");
            }
          },
          x: function (a, r, i, o) {
            var s = (o._originalDate || a).getTimezoneOffset();
            switch (r) {
              case "x":
                return formatTimezoneWithOptionalMinutes(s);
              case "xxxx":
              case "xx":
                return formatTimezone(s);
              default:
                return formatTimezone(s, ":");
            }
          },
          O: function (a, r, i, o) {
            var s = (o._originalDate || a).getTimezoneOffset();
            switch (r) {
              case "O":
              case "OO":
              case "OOO":
                return "GMT" + formatTimezoneShort(s, ":");
              default:
                return "GMT" + formatTimezone(s, ":");
            }
          },
          z: function (a, r, i, o) {
            var s = (o._originalDate || a).getTimezoneOffset();
            switch (r) {
              case "z":
              case "zz":
              case "zzz":
                return "GMT" + formatTimezoneShort(s, ":");
              default:
                return "GMT" + formatTimezone(s, ":");
            }
          },
          t: function (a, r, i, o) {
            var s = o._originalDate || a;
            return addLeadingZeros(Math.floor(s.getTime() / 1e3), r.length);
          },
          T: function (a, r, i, o) {
            return addLeadingZeros((o._originalDate || a).getTime(), r.length);
          },
        };
      function formatTimezoneShort(a, r) {
        var i = a > 0 ? "-" : "+",
          o = Math.abs(a),
          s = Math.floor(o / 60),
          l = o % 60;
        if (0 === l) return i + String(s);
        var d = r || "";
        return i + String(s) + d + addLeadingZeros(l, 2);
      }
      function formatTimezoneWithOptionalMinutes(a, r) {
        return a % 60 == 0
          ? (a > 0 ? "-" : "+") + addLeadingZeros(Math.abs(a) / 60, 2)
          : formatTimezone(a, r);
      }
      function formatTimezone(a, r) {
        var i = r || "",
          o = a > 0 ? "-" : "+",
          s = Math.abs(a);
        return (
          o +
          addLeadingZeros(Math.floor(s / 60), 2) +
          i +
          addLeadingZeros(s % 60, 2)
        );
      }
      const st = ot;
      var dateLongFormatter = function (a, r) {
          switch (a) {
            case "P":
              return r.date({ width: "short" });
            case "PP":
              return r.date({ width: "medium" });
            case "PPP":
              return r.date({ width: "long" });
            default:
              return r.date({ width: "full" });
          }
        },
        timeLongFormatter = function (a, r) {
          switch (a) {
            case "p":
              return r.time({ width: "short" });
            case "pp":
              return r.time({ width: "medium" });
            case "ppp":
              return r.time({ width: "long" });
            default:
              return r.time({ width: "full" });
          }
        },
        lt = {
          p: timeLongFormatter,
          P: function (a, r) {
            var i,
              o = a.match(/(P+)(p+)?/) || [],
              s = o[1],
              l = o[2];
            if (!l) return dateLongFormatter(a, r);
            switch (s) {
              case "P":
                i = r.dateTime({ width: "short" });
                break;
              case "PP":
                i = r.dateTime({ width: "medium" });
                break;
              case "PPP":
                i = r.dateTime({ width: "long" });
                break;
              default:
                i = r.dateTime({ width: "full" });
            }
            return i
              .replace("{{date}}", dateLongFormatter(s, r))
              .replace("{{time}}", timeLongFormatter(l, r));
          },
        };
      const dt = lt;
      var ct = ["D", "DD"],
        pt = ["YY", "YYYY"];
      function throwProtectedError(a, r, i) {
        if ("YYYY" === a)
          throw new RangeError(
            "Use `yyyy` instead of `YYYY` (in `"
              .concat(r, "`) for formatting years to the input `")
              .concat(
                i,
                "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"
              )
          );
        if ("YY" === a)
          throw new RangeError(
            "Use `yy` instead of `YY` (in `"
              .concat(r, "`) for formatting years to the input `")
              .concat(
                i,
                "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"
              )
          );
        if ("D" === a)
          throw new RangeError(
            "Use `d` instead of `D` (in `"
              .concat(r, "`) for formatting days of the month to the input `")
              .concat(
                i,
                "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"
              )
          );
        if ("DD" === a)
          throw new RangeError(
            "Use `dd` instead of `DD` (in `"
              .concat(r, "`) for formatting days of the month to the input `")
              .concat(
                i,
                "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"
              )
          );
      }
      var gt = {
        lessThanXSeconds: {
          one: "less than a second",
          other: "less than {{count}} seconds",
        },
        xSeconds: { one: "1 second", other: "{{count}} seconds" },
        halfAMinute: "half a minute",
        lessThanXMinutes: {
          one: "less than a minute",
          other: "less than {{count}} minutes",
        },
        xMinutes: { one: "1 minute", other: "{{count}} minutes" },
        aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
        xHours: { one: "1 hour", other: "{{count}} hours" },
        xDays: { one: "1 day", other: "{{count}} days" },
        aboutXWeeks: { one: "about 1 week", other: "about {{count}} weeks" },
        xWeeks: { one: "1 week", other: "{{count}} weeks" },
        aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
        xMonths: { one: "1 month", other: "{{count}} months" },
        aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
        xYears: { one: "1 year", other: "{{count}} years" },
        overXYears: { one: "over 1 year", other: "over {{count}} years" },
        almostXYears: { one: "almost 1 year", other: "almost {{count}} years" },
      };
      const _lib_formatDistance = function (a, r, i) {
        var o,
          s = gt[a];
        return (
          (o =
            "string" == typeof s
              ? s
              : 1 === r
              ? s.one
              : s.other.replace("{{count}}", r.toString())),
          null != i && i.addSuffix
            ? i.comparison && i.comparison > 0
              ? "in " + o
              : o + " ago"
            : o
        );
      };
      function buildFormatLongFn(a) {
        return function () {
          var r =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            i = r.width ? String(r.width) : a.defaultWidth;
          return a.formats[i] || a.formats[a.defaultWidth];
        };
      }
      var ht = {
        date: buildFormatLongFn({
          formats: {
            full: "EEEE, MMMM do, y",
            long: "MMMM do, y",
            medium: "MMM d, y",
            short: "MM/dd/yyyy",
          },
          defaultWidth: "full",
        }),
        time: buildFormatLongFn({
          formats: {
            full: "h:mm:ss a zzzz",
            long: "h:mm:ss a z",
            medium: "h:mm:ss a",
            short: "h:mm a",
          },
          defaultWidth: "full",
        }),
        dateTime: buildFormatLongFn({
          formats: {
            full: "{{date}} 'at' {{time}}",
            long: "{{date}} 'at' {{time}}",
            medium: "{{date}}, {{time}}",
            short: "{{date}}, {{time}}",
          },
          defaultWidth: "full",
        }),
      };
      var ut = {
        lastWeek: "'last' eeee 'at' p",
        yesterday: "'yesterday at' p",
        today: "'today at' p",
        tomorrow: "'tomorrow at' p",
        nextWeek: "eeee 'at' p",
        other: "P",
      };
      function buildLocalizeFn(a) {
        return function (r, i) {
          var o;
          if (
            "formatting" ===
              (null != i && i.context ? String(i.context) : "standalone") &&
            a.formattingValues
          ) {
            var s = a.defaultFormattingWidth || a.defaultWidth,
              l = null != i && i.width ? String(i.width) : s;
            o = a.formattingValues[l] || a.formattingValues[s];
          } else {
            var d = a.defaultWidth,
              c = null != i && i.width ? String(i.width) : a.defaultWidth;
            o = a.values[c] || a.values[d];
          }
          return o[a.argumentCallback ? a.argumentCallback(r) : r];
        };
      }
      function buildMatchFn(a) {
        return function (r) {
          var i =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            o = i.width,
            s =
              (o && a.matchPatterns[o]) || a.matchPatterns[a.defaultMatchWidth],
            l = r.match(s);
          if (!l) return null;
          var d,
            c = l[0],
            p =
              (o && a.parsePatterns[o]) || a.parsePatterns[a.defaultParseWidth],
            g = Array.isArray(p)
              ? (function (a, r) {
                  for (var i = 0; i < a.length; i++) if (r(a[i])) return i;
                  return;
                })(p, function (a) {
                  return a.test(c);
                })
              : (function (a, r) {
                  for (var i in a) if (a.hasOwnProperty(i) && r(a[i])) return i;
                  return;
                })(p, function (a) {
                  return a.test(c);
                });
          return (
            (d = a.valueCallback ? a.valueCallback(g) : g),
            {
              value: (d = i.valueCallback ? i.valueCallback(d) : d),
              rest: r.slice(c.length),
            }
          );
        };
      }
      var ft;
      const bt = {
        code: "en-US",
        formatDistance: _lib_formatDistance,
        formatLong: ht,
        formatRelative: function (a, r, i, o) {
          return ut[a];
        },
        localize: {
          ordinalNumber: function (a, r) {
            var i = Number(a),
              o = i % 100;
            if (o > 20 || o < 10)
              switch (o % 10) {
                case 1:
                  return i + "st";
                case 2:
                  return i + "nd";
                case 3:
                  return i + "rd";
              }
            return i + "th";
          },
          era: buildLocalizeFn({
            values: {
              narrow: ["B", "A"],
              abbreviated: ["BC", "AD"],
              wide: ["Before Christ", "Anno Domini"],
            },
            defaultWidth: "wide",
          }),
          quarter: buildLocalizeFn({
            values: {
              narrow: ["1", "2", "3", "4"],
              abbreviated: ["Q1", "Q2", "Q3", "Q4"],
              wide: [
                "1st quarter",
                "2nd quarter",
                "3rd quarter",
                "4th quarter",
              ],
            },
            defaultWidth: "wide",
            argumentCallback: function (a) {
              return a - 1;
            },
          }),
          month: buildLocalizeFn({
            values: {
              narrow: [
                "J",
                "F",
                "M",
                "A",
                "M",
                "J",
                "J",
                "A",
                "S",
                "O",
                "N",
                "D",
              ],
              abbreviated: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              wide: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
            },
            defaultWidth: "wide",
          }),
          day: buildLocalizeFn({
            values: {
              narrow: ["S", "M", "T", "W", "T", "F", "S"],
              short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
              abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              wide: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
            },
            defaultWidth: "wide",
          }),
          dayPeriod: buildLocalizeFn({
            values: {
              narrow: {
                am: "a",
                pm: "p",
                midnight: "mi",
                noon: "n",
                morning: "morning",
                afternoon: "afternoon",
                evening: "evening",
                night: "night",
              },
              abbreviated: {
                am: "AM",
                pm: "PM",
                midnight: "midnight",
                noon: "noon",
                morning: "morning",
                afternoon: "afternoon",
                evening: "evening",
                night: "night",
              },
              wide: {
                am: "a.m.",
                pm: "p.m.",
                midnight: "midnight",
                noon: "noon",
                morning: "morning",
                afternoon: "afternoon",
                evening: "evening",
                night: "night",
              },
            },
            defaultWidth: "wide",
            formattingValues: {
              narrow: {
                am: "a",
                pm: "p",
                midnight: "mi",
                noon: "n",
                morning: "in the morning",
                afternoon: "in the afternoon",
                evening: "in the evening",
                night: "at night",
              },
              abbreviated: {
                am: "AM",
                pm: "PM",
                midnight: "midnight",
                noon: "noon",
                morning: "in the morning",
                afternoon: "in the afternoon",
                evening: "in the evening",
                night: "at night",
              },
              wide: {
                am: "a.m.",
                pm: "p.m.",
                midnight: "midnight",
                noon: "noon",
                morning: "in the morning",
                afternoon: "in the afternoon",
                evening: "in the evening",
                night: "at night",
              },
            },
            defaultFormattingWidth: "wide",
          }),
        },
        match: {
          ordinalNumber:
            ((ft = {
              matchPattern: /^(\d+)(th|st|nd|rd)?/i,
              parsePattern: /\d+/i,
              valueCallback: function (a) {
                return parseInt(a, 10);
              },
            }),
            function (a) {
              var r =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {},
                i = a.match(ft.matchPattern);
              if (!i) return null;
              var o = i[0],
                s = a.match(ft.parsePattern);
              if (!s) return null;
              var l = ft.valueCallback ? ft.valueCallback(s[0]) : s[0];
              return {
                value: (l = r.valueCallback ? r.valueCallback(l) : l),
                rest: a.slice(o.length),
              };
            }),
          era: buildMatchFn({
            matchPatterns: {
              narrow: /^(b|a)/i,
              abbreviated:
                /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
              wide: /^(before christ|before common era|anno domini|common era)/i,
            },
            defaultMatchWidth: "wide",
            parsePatterns: { any: [/^b/i, /^(a|c)/i] },
            defaultParseWidth: "any",
          }),
          quarter: buildMatchFn({
            matchPatterns: {
              narrow: /^[1234]/i,
              abbreviated: /^q[1234]/i,
              wide: /^[1234](th|st|nd|rd)? quarter/i,
            },
            defaultMatchWidth: "wide",
            parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
            defaultParseWidth: "any",
            valueCallback: function (a) {
              return a + 1;
            },
          }),
          month: buildMatchFn({
            matchPatterns: {
              narrow: /^[jfmasond]/i,
              abbreviated:
                /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
              wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
            },
            defaultMatchWidth: "wide",
            parsePatterns: {
              narrow: [
                /^j/i,
                /^f/i,
                /^m/i,
                /^a/i,
                /^m/i,
                /^j/i,
                /^j/i,
                /^a/i,
                /^s/i,
                /^o/i,
                /^n/i,
                /^d/i,
              ],
              any: [
                /^ja/i,
                /^f/i,
                /^mar/i,
                /^ap/i,
                /^may/i,
                /^jun/i,
                /^jul/i,
                /^au/i,
                /^s/i,
                /^o/i,
                /^n/i,
                /^d/i,
              ],
            },
            defaultParseWidth: "any",
          }),
          day: buildMatchFn({
            matchPatterns: {
              narrow: /^[smtwf]/i,
              short: /^(su|mo|tu|we|th|fr|sa)/i,
              abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
              wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
            },
            defaultMatchWidth: "wide",
            parsePatterns: {
              narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
              any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
            },
            defaultParseWidth: "any",
          }),
          dayPeriod: buildMatchFn({
            matchPatterns: {
              narrow:
                /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
              any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
            },
            defaultMatchWidth: "any",
            parsePatterns: {
              any: {
                am: /^a/i,
                pm: /^p/i,
                midnight: /^mi/i,
                noon: /^no/i,
                morning: /morning/i,
                afternoon: /afternoon/i,
                evening: /evening/i,
                night: /night/i,
              },
            },
            defaultParseWidth: "any",
          }),
        },
        options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
      };
      var mt = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
        yt = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
        wt = /^'([^]*?)'?$/,
        vt = /''/g,
        xt = /[a-zA-Z]/;
      function format(a, r, i) {
        var o, s, l, d, c, p, g, h, u, f, b, m, y, w, v, x, _, S;
        requiredArgs(2, arguments);
        var k = String(r),
          A = getDefaultOptions(),
          T =
            null !==
              (o =
                null !== (s = null == i ? void 0 : i.locale) && void 0 !== s
                  ? s
                  : A.locale) && void 0 !== o
              ? o
              : bt,
          C = toInteger(
            null !==
              (l =
                null !==
                  (d =
                    null !==
                      (c =
                        null !==
                          (p = null == i ? void 0 : i.firstWeekContainsDate) &&
                        void 0 !== p
                          ? p
                          : null == i ||
                            null === (g = i.locale) ||
                            void 0 === g ||
                            null === (h = g.options) ||
                            void 0 === h
                          ? void 0
                          : h.firstWeekContainsDate) && void 0 !== c
                      ? c
                      : A.firstWeekContainsDate) && void 0 !== d
                  ? d
                  : null === (u = A.locale) ||
                    void 0 === u ||
                    null === (f = u.options) ||
                    void 0 === f
                  ? void 0
                  : f.firstWeekContainsDate) && void 0 !== l
              ? l
              : 1
          );
        if (!(C >= 1 && C <= 7))
          throw new RangeError(
            "firstWeekContainsDate must be between 1 and 7 inclusively"
          );
        var I = toInteger(
          null !==
            (b =
              null !==
                (m =
                  null !==
                    (y =
                      null !== (w = null == i ? void 0 : i.weekStartsOn) &&
                      void 0 !== w
                        ? w
                        : null == i ||
                          null === (v = i.locale) ||
                          void 0 === v ||
                          null === (x = v.options) ||
                          void 0 === x
                        ? void 0
                        : x.weekStartsOn) && void 0 !== y
                    ? y
                    : A.weekStartsOn) && void 0 !== m
                ? m
                : null === (_ = A.locale) ||
                  void 0 === _ ||
                  null === (S = _.options) ||
                  void 0 === S
                ? void 0
                : S.weekStartsOn) && void 0 !== b
            ? b
            : 0
        );
        if (!(I >= 0 && I <= 6))
          throw new RangeError(
            "weekStartsOn must be between 0 and 6 inclusively"
          );
        if (!T.localize)
          throw new RangeError("locale must contain localize property");
        if (!T.formatLong)
          throw new RangeError("locale must contain formatLong property");
        var B = toDate(a);
        if (!isValid(B)) throw new RangeError("Invalid time value");
        var D = (function (a) {
            var r = new Date(
              Date.UTC(
                a.getFullYear(),
                a.getMonth(),
                a.getDate(),
                a.getHours(),
                a.getMinutes(),
                a.getSeconds(),
                a.getMilliseconds()
              )
            );
            return r.setUTCFullYear(a.getFullYear()), a.getTime() - r.getTime();
          })(B),
          E = (function (a, r) {
            return (
              requiredArgs(2, arguments), addMilliseconds(a, -toInteger(r))
            );
          })(B, D),
          z = {
            firstWeekContainsDate: C,
            weekStartsOn: I,
            locale: T,
            _originalDate: B,
          };
        return k
          .match(yt)
          .map(function (a) {
            var r = a[0];
            return "p" === r || "P" === r ? (0, dt[r])(a, T.formatLong) : a;
          })
          .join("")
          .match(mt)
          .map(function (o) {
            if ("''" === o) return "'";
            var s = o[0];
            if ("'" === s)
              return (function (a) {
                var r = a.match(wt);
                if (!r) return a;
                return r[1].replace(vt, "'");
              })(o);
            var l,
              d = st[s];
            if (d)
              return (
                (null != i && i.useAdditionalWeekYearTokens) ||
                  ((l = o), -1 === pt.indexOf(l)) ||
                  throwProtectedError(o, r, String(a)),
                (null != i && i.useAdditionalDayOfYearTokens) ||
                  !(function (a) {
                    return -1 !== ct.indexOf(a);
                  })(o) ||
                  throwProtectedError(o, r, String(a)),
                d(E, o, T.localize, z)
              );
            if (s.match(xt))
              throw new RangeError(
                "Format string contains an unescaped latin alphabet character `" +
                  s +
                  "`"
              );
            return o;
          })
          .join("");
      }
      const _t = "READ_BOOKING_JOB";
      Math.pow(10, 8);
      var St = {
          ceil: Math.ceil,
          round: Math.round,
          floor: Math.floor,
          trunc: function (a) {
            return a < 0 ? Math.ceil(a) : Math.floor(a);
          },
        },
        kt = "trunc";
      function differenceInMinutes(a, r, i) {
        requiredArgs(2, arguments);
        var o,
          s =
            (function (a, r) {
              return (
                requiredArgs(2, arguments),
                toDate(a).getTime() - toDate(r).getTime()
              );
            })(a, r) / 6e4;
        return ((o = null == i ? void 0 : i.roundingMethod) ? St[o] : St[kt])(
          s
        );
      }
      const At = "SYNC_WAITING_TIME_JOB";
      (__webpack_require__.g.sendmail = () => {
        const a = Session.getActiveUser().getEmail(),
          r =
            '\n    <p>This email was sent using the <a href="https://www.labnol.org/internet/google-apps-script-developers/32305/">Google Apps Script Starter kit</a>.</p>\n    <p> The starter kit is used by <a href="https://digitalinspiration.com/">Digital Inspiration</a> for building popular Google Workspace add-on including <a href="https://workspace.google.com/marketplace/app/mail_merge_with_attachments/223404411203">Gmail Mail Merge</a> and <a href="https://workspace.google.com/marketplace/app/document_studio/429444628321">Document Studio</a>. </p>\n    <p>For assistance, please contact <a href="https://twitter.com/labnol">@labnol</a></p>',
          i = r.replace(/<[^>]+>/g, " ");
        GmailApp.sendEmail(a, "Hello from Google Apps Script", i, {
          htmlBody: r,
        }),
          Logger.log(`Email message sent to${a}`);
      }),
        (__webpack_require__.g.doPost = controller_router),
        (__webpack_require__.g.doGet = () =>
          HtmlService.createHtmlOutputFromFile("index.html")
            .setTitle("VetGoTeam")
            .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT)),
        (__webpack_require__.g.getGmailLabels = () => {
          const { labels: a = [] } = Gmail.Users.Labels.list("me"),
            r = a.filter(({ type: a }) => "user" === a).map(({ name: a }) => a);
          return Logger.log("Labels: %s", r), r;
        }),
        (__webpack_require__.g.getGmailAliases = () => {
          try {
            const { sendAs: a = [] } = Gmail.Users.Settings.SendAs.list("me");
            if (a.length) return a.map((a) => a.sendAsEmail);
          } catch (a) {
            Logger.log(a.message);
          }
          return [Session.getActiveUser().getEmail()];
        }),
        (__webpack_require__.g.createSixMinuteSchedule = () => {
          const a = PropertiesService.getScriptProperties(),
            r = a.getProperty("SIX_MINUTE_TRIGGER_ID");
          r &&
            ScriptApp.getProjectTriggers().forEach(function (a) {
              a.getUniqueId() === r && ScriptApp.deleteTrigger(a);
            });
          const i = ScriptApp.newTrigger("runJob")
            .timeBased()
            .everyMinutes(5)
            .create();
          a.setProperty("SIX_MINUTE_TRIGGER_ID", i.getUniqueId()),
            Logger.log("Six-minute schedule created successfully.");
        }),
        (__webpack_require__.g.runJob = () => {
          const a = new c(),
            r = new l(),
            i = new Date(),
            o = r.getAll("PHONE_CUSTOMER").filter((a) => "DONE" !== a.status);
          let s = 0;
          for (let l of o) {
            try {
              a.addContact([l]);
            } catch (a) {
              Logger.log("Error -> runJob -> addContact " + a);
            }
            if (
              (r.updateById(
                "PHONE_CUSTOMER",
                l.id,
                Object.assign({}, l, { status: "DONE" })
              ),
              s++,
              new Date() - i >= 24e4)
            )
              break;
          }
          Logger.log("Job running done..." + s);
        }),
        (__webpack_require__.g.createTriggerRunSendSms = () => {
          const a = PropertiesService.getScriptProperties();
          if (!a.getProperty("RunSendSms")) {
            const r = ScriptApp.newTrigger("jobSendSms")
              .timeBased()
              .everyMinutes(1)
              .create();
            a.setProperty("RunSendSms", r.getUniqueId()),
              Logger.log("RunSendSms schedule created successfully.");
          }
        }),
        (__webpack_require__.g.jobSendSms = () => {
          var a;
          Logger.log("dang lấy task send sms");
          const r = new s(),
            i = new Date(),
            o = i.getHours();
          let l = 8,
            d = 20;
          const c = r.getById(Y, "CONFIG_EXTEND");
          let p = "VNPAY",
            g = "PET",
            h = "104.21.19.101";
          if (null != c && null !== (a = c.data) && void 0 !== a && a.data) {
            var u;
            const a = JSON.parse(
              null == c || null === (u = c.data) || void 0 === u
                ? void 0
                : u.data
            );
            (h = (null == a ? void 0 : a.ip) ?? "104.21.19.101"),
              (p = (null == a ? void 0 : a.sender) ?? "VNPAY"),
              (g = (null == a ? void 0 : a.keyword) ?? "PET"),
              (l = (null == a ? void 0 : a.fromExecute) ?? 8),
              (d = (null == a ? void 0 : a.toExecute) ?? 20);
          }
          if (o < l || o > d)
            return void console.log(
              "Quá giờ hành chính config ko làm nữa nhé currentHour " + o
            );
          Logger.log("ipFake " + h + " sender " + p + " keyword " + g);
          const f = `${i.getDate().toString().padStart(2, "0")}/${(
            i.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}/${i.getFullYear()}`;
          console.log(f), i.setDate(i.getDate() + 1);
          const b = `${i.getDate().toString().padStart(2, "0")}/${(
            i.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}/${i.getFullYear()}`;
          console.log(b);
          const m = r
            .getAll("SEND_SMS_TASK")
            .filter(
              (a) =>
                "AWAIT" === a.status &&
                "SEND_MESSAGE" === (null == a ? void 0 : a.actionType) &&
                ((null == a ? void 0 : a.exeDate) === f ||
                  (null == a ? void 0 : a.exeDate) === b)
            );
          if ((Logger.log(m), m && m.length > 0)) {
            var y;
            const a = r.getById(Y, "CONFIG_VNPAY");
            let i;
            if (
              (Logger.log("resLicense"),
              Logger.log(a),
              null == a || null === (y = a.data) || void 0 === y || !y.data)
            )
              return void Logger.log("ko thấy config sms");
            var w;
            i = JSON.parse(
              null == a || null === (w = a.data) || void 0 === w
                ? void 0
                : w.data
            );
            const o = i.apiUrl + "/smsgw/sendSmsList",
              s = Math.floor(new Date().getTime() / 1e3),
              l = { "Content-Type": "application/json" },
              d = m.map((a) => {
                const r = JSON.parse(a.data);
                return {
                  messageId: a.id,
                  destination: null == r ? void 0 : r.phone,
                  sender: p,
                  keyword: g,
                  shortMessage: removeAccents(null == r ? void 0 : r.message),
                  requestTime: s,
                };
              }),
              c = {
                partnerCode: i.partnerCode,
                secretKey: i.secretKey,
                data: d,
              };
            Logger.log("yêu cầu gửi sms"), Logger.log(c);
            const h = {
                method: "post",
                headers: l,
                contentType: "application/json",
                payload: JSON.stringify(c),
              },
              u = UrlFetchApp.fetch(o, h),
              f = JSON.parse(u.getContentText());
            Logger.log("Xử lý dữ liệu phản hồi từ API"), Logger.log(f);
            const b = m.map((a) => {
              const r = (function (a, r) {
                  return r && r.length > 0
                    ? r.find((r) => r.messageId === a) ?? ""
                    : "";
                })(a.id, f),
                i = Object.assign({}, r, {
                  providerName:
                    ((o = null == r ? void 0 : r.providerId),
                    (o in Z ? Z[o] : "Unknown provider") ?? ""),
                });
              var o;
              return Object.assign({}, a, {
                log: JSON.stringify(i),
                status:
                  "00" === (null == r ? void 0 : r.status)
                    ? "FINISH"
                    : "FAILED",
              });
            });
            b &&
              b.length > 0 &&
              (Logger.log("Đã làm xong update lại task nè"),
              Logger.log(b),
              r.addAll("SEND_SMS_TASK", { data: b }));
          } else Logger.log("Đã làm hêt task r nè");
        }),
        (__webpack_require__.g.syncBookingJob = () => {
          !(function (a = "") {
            const r = new Date(),
              i = addDays(
                new Date(r.getFullYear(), r.getMonth(), r.getDate(), 19, 0, 0),
                1
              ),
              o = PropertiesService.getScriptProperties(),
              s = o.getProperty(_t);
            s &&
              (o.deleteProperty(_t),
              ScriptApp.getProjectTriggers().forEach(function (a) {
                a.getUniqueId() === s &&
                  (ScriptApp.deleteTrigger(a),
                  Logger.log("End remove trigger"));
              }));
            const l = ScriptApp.newTrigger(a).timeBased().at(i).create();
            o.setProperty(_t, l.getUniqueId()),
              Logger.log(`JOB_${_t} make schedule created successfully.`);
          })("syncBookingJob");
          const a = new s(),
            r = a.getById(Y, "CONFIG_FIREBASE"),
            i = a.getById(Y, "CONFIG_VNPAY_TEMPLATE");
          let o = {};
          if (i.data)
            if ((Logger.log(i), (o = JSON.parse(i.data.data)), r.data)) {
              const i = JSON.parse(r.data.data).databaseURL,
                s = new l(i),
                d = s
                  .getBySeqNo("BOOKING", 0)
                  .map((a) => ({
                    id: a.id,
                    brand: a.brand,
                    cusId: a.cusId,
                    deleted: a.deleted,
                    note: a.note,
                    petName: a.petName,
                    petId: a.petId,
                    phone: a.phone,
                    priority: a.priority,
                    seqNo: a.seqNo,
                    status: a.status,
                    sync: a.sync,
                    time: a.time,
                    userName: a.userName,
                    createdBy: a.createdBy,
                    createAt: a.createAt,
                  }));
              Logger.log("Add list booking " + d.length);
              const c = (s.getBySeqNo("SETTING", 0) || [])
                .filter((a) => "LICENSE_ZALO_DATA" === a.id)
                .pop();
              if (!c) return;
              Logger.log(c);
              const p = JSON.parse(c.value),
                g = d;
              console.log(g.length);
              const h = {},
                u = g
                  .filter(
                    (a) => (0 === a.status || 1 === a.status) && p[a.brand]
                  )
                  .filter((a) => isTomorrow(new Date(a.time)))
                  .filter(
                    (a) =>
                      a.phone &&
                      /((09|03|07|08|05)+([0-9]{8})\b)/g.test(
                        (a.phone || "").replace(/[().]/g, "")
                      )
                  )
                  .reduce((a, r) => {
                    let i;
                    if (o[r.priority]) {
                      const a = {
                        phone: p[r.brand],
                        time: format(new Date(r.time), "HH:mm"),
                        day: format(new Date(r.time), "dd/MM"),
                        userName: r.userName,
                        petName: r.petName || "Bé",
                      };
                      i = o[r.priority].replace(
                        /\${(.*?)}/g,
                        (r, i) => a[i.trim()]
                      );
                    }
                    if (i) {
                      const o = {
                        actionType: "REMINDER_CALENDAR",
                        sender: p[r.brand],
                        phone: r.phone,
                        message: i,
                        exeDate: format(new Date(), "dd/MM/yyyy"),
                        time: format(new Date(r.time), "dd/MM/yyyy;HH:mm"),
                      };
                      Logger.log("triger add reminder", o);
                      const s = {
                          phone: r.phone,
                          message: o.message,
                          time: o.time,
                        },
                        l = {
                          id: uuid(),
                          data: JSON.stringify(s),
                          status: "AWAIT",
                          log: "",
                          actionType: o.actionType,
                          exeDate: o.exeDate,
                        };
                      h[r.phone] ||
                        (a[p[r.brand]] = [...(a[p[r.brand]] || []), l]),
                        (h[r.phone] = l);
                    }
                    return a;
                  }, {});
              Logger.log(u),
                Object.keys(u).forEach((r) => {
                  Logger.log(u[r]),
                    a.addAll(`${r}_MANAGER_TASK`, { data: u[r] }),
                    Logger.log("add by sender");
                });
            } else
              Logger.log("syncBookingJob -> khong tim thay firebase config");
          else Logger.log("syncBookingJob -> khong tim thay template");
        }),
        (__webpack_require__.g.syncWaitingTimeJob = () => {
          !(function (a = "") {
            const r = PropertiesService.getScriptProperties();
            if (!r.getProperty(At)) {
              const i = ScriptApp.newTrigger(a)
                .timeBased()
                .everyMinutes(5)
                .create();
              r.setProperty(At, i.getUniqueId()),
                Logger.log(`JOB_${At} make schedule created successfully.`);
            }
          })("syncWaitingTimeJob");
          const a = new s(),
            r = a.getById(Y, "CONFIG_FIREBASE");
          if (r.data) {
            const i = JSON.parse(r.data.data).databaseURL,
              o = (new l(i).getBySeqNo("SETTING", 0) || [])
                .filter((a) => "LICENSE_ZALO_DATA" === a.id)
                .pop();
            if (!o) return;
            Logger.log(o);
            const s = JSON.parse(o.value);
            Logger.log(s),
              s &&
                Object.values(s).forEach((r) => {
                  const i = a.getAll(`${r}_MANAGER_TASK`);
                  if (
                    i.filter(
                      (a) =>
                        "AWAIT" === a.status &&
                        a.exeDate === format(new Date(), "dd/MM/yyyy") &&
                        differenceInMinutes(
                          new Date(),
                          new Date(a.lastUpdated)
                        ) > 30
                    ).length > 0
                  ) {
                    const i = a.getById("DEVICE_REMOTE", r);
                    if ("SUCCESS" === i.status) {
                      const a = i.data;
                      if ((Logger.log("DEVICE_REMOTE -> find"), !a.qrCode)) {
                        new h().sendTelegramMessage(
                          `Số điện thoại này không làm task ${r}_MANAGER_TASK`
                        );
                      }
                    }
                  } else Logger.log("Không có thông báo khẩn cấp");
                  const o = i
                    .filter(
                      (a) =>
                        "WAITING_TIME" === a.status &&
                        a.exeDate === format(new Date(), "dd/MM/yyyy")
                    )
                    .filter((a) => {
                      const r = JSON.parse(`${a.data}`);
                      return (
                        r.waitingTime &&
                        new Date().getTime() > new Date(r.waitingTime).getTime()
                      );
                    })
                    .map((a) => ((a.status = "AWAIT"), a));
                  o.length > 0
                    ? (Logger.log(o),
                      a.addAll(`${r}_MANAGER_TASK`, { data: o }))
                    : Logger.log(
                        "Không có tin nhắn nào cần update từ WAITING_TIME -> AWAIT"
                      );
                });
          } else
            Logger.log("syncWaitingTimeJob -> khong tim thay firebase config");
        }),
        (__webpack_require__.g.jobSyncProductKiotViet = jobSyncProductKiotViet);
    })();
})();
