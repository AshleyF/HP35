	jsb @067
	go to @277
	0 -> s8
	go to @005
	1 -> s5
	1 -> s9
	1 -> s2
	select rom 2
	jsb @124
	go to @102
	go to @027
	go to @060
	stack -> a
	go to @331
	0 -> a[w]
	a + 1 -> a[p]
	0 -> b[w]
	select rom 1
	a + 1 -> a[x]
	a + 1 -> a[x]
	a + 1 -> a[x]
	go to @032
	jsb @232
	c exchange m
	m -> c
	go to @077
	a + 1 -> a[x]
	a + 1 -> a[x]
	a + 1 -> a[x]
	return
	3 -> p
	0 - c -> c[x]
	stack -> a
	go to @020
	go to @164
	11 -> p
	return
	no operation
	go to @040
	1 -> s5
	1 -> s1
	go to @056
	1 -> s9
	go to @047
	1 -> s10
	go to @302
	0 -> b[w]
	select rom 1
	down rotate
	go to @333
	a + 1 -> a[x]
	a + 1 -> a[x]
	a + 1 -> a[x]
	go to @022
	go to @231
	clear registers
	jsb @355
	go to @335
	go to @166
	shift right a[w]
	1 -> s3
	go to @340
	c -> stack
	clear status
	shift right a[w]
	go to @335
	m -> c
	go to @333
	a -> b[w]
	0 -> a[xs]
	shift left a[ms]
	a - 1 -> a[x]
	go to @207
	if c[xs] = 0
	go to @215
	a exchange b[ms]
	13 -> p
	go to @215
	a exchange b[w]
	0 -> a[w]
	if s3 = 0
	go to @124
	a - 1 -> a[s]
	0 - c - 1 -> c[s]
	if s7 = 0
	go to @127
	c -> stack
	1 -> s7
	0 -> c[w]
	c - 1 -> c[x]
	a exchange c[s]
	if p # 11
	go to @107
	jsb @107
	1 -> s6
	jsb @345
	shift right a[ms]
	if p # 12
	go to @136
	b exchange c[w]
	c + 1 -> c[w]
	1 -> p
	shift left a[wp]
	p + 1 -> p
	if c[p] = 0
	go to @146
	c - 1 -> c[w]
	b exchange c[w]
	a exchange c[m]
	if p # 3
	go to @257
	a exchange c[m]
	0 -> a[x]
	if s4 = 0
	go to @137
	go to @172
	jsb @124
	select rom 1
	1 -> s4
	if s11 = 0
	go to @034
	shift right a[w]
	jsb @345
	a -> b[x]
	shift right a[w]
	a -> b[xs]
	a - b -> a[x]
	a exchange c[x]
	if b[xs] = 0
	go to @203
	0 - c -> c[x]
	a - c -> c[x]
	c -> a[x]
	jsb @360
	go to @335
	shift right a[ms]
	p - 1 -> p
	if p # 2
	go to @107
	12 -> p
	0 -> a[w]
	0 -> a[ms]
	a + 1 -> a[p]
	a + 1 -> a[p]
	2 -> p
	p + 1 -> p
	a - 1 -> a[p]
	go to @226
	if b[p] = 0
	go to @221
	a + 1 -> a[p]
	a exchange b[w]
	return
	0 - c - 1 -> c[s]
	stack -> a
	0 -> b[w]
	a + 1 -> a[xs]
	a + 1 -> a[xs]
	c + 1 -> c[xs]
	c + 1 -> c[xs]
	if a >= c[x]
	go to @243
	a exchange c[w]
	a exchange c[m]
	if c[m] = 0
	go to @247
	a exchange c[w]
	b exchange c[m]
	if a >= c[x]
	go to @276
	shift right b[w]
	a + 1 -> a[x]
	if b[w] = 0
	go to @276
	go to @250
	c -> a[m]
	if s6 = 0
	go to @264
	p - 1 -> p
	c - 1 -> c[x]
	shift right b[wp]
	12 -> p
	if c[m] = 0
	go to @160
	c + 1 -> c[x]
	1 -> s11
	if a[p] >= 1
	go to @157
	shift left a[m]
	go to @272
	select rom 1
	jsb @355
	1 -> s5
	go to @335
	shift right a[w]
	c -> a[s]
	0 -> s8
	go to @317
	c + 1 -> c[xs]
	1 -> s8
	if s5 = 0
	go to @315
	c + 1 -> c[x]
	go to @306
	display toggle
	if s0 = 0
	go to @307
	0 -> s0
	p - 1 -> p
	if p # 12
	go to @320
	display off
	if s8 = 0
	go to @314
	shift left a[w]
	0 -> s5
	keys -> rom address
	c -> stack
	a exchange c[w]
	jsb @375
	1 -> s7
	jsb @345
	jsb @116
	go to @143
	if s4 = 0
	go to @344
	a + b -> a[xs]
	go to @373
	0 - c - 1 -> c[s]
	0 -> s10
	go to @303
	a exchange c[xs]
	0 -> c[wp]
	c - 1 -> c[wp]
	0 -> c[xs]
	if a[xs] >= 1
	go to @375
	0 -> c[w]
	clear status
	c -> a[w]
	12 -> p
	if c[xs] = 0
	go to @367
	0 - c -> c[x]
	c - 1 -> c[xs]
	go to @347
	5 -> p
	a exchange c[x]
	if s4 = 0
	go to @104
	a exchange b[x]
	0 -> b[x]
	go to @172
	if c[m] >= 1
	go to @356
	go to @355
	go to @363
	a exchange b[w]
	jsb @050
	stack -> a
	jsb @050
	stack -> a
	if s9 = 0
	go to @011
	a exchange c[w]
	if s5 = 0
	go to @022
	0 -> c[s]
	jsb @246
	c -> stack
	jsb @245
	jsb @230
	jsb @045
	stack -> a
	jsb @246
	if s10 = 0
	go to @332
	0 -> a[w]
	a + 1 -> a[p]
	a -> b[m]
	a exchange c[m]
	c - 1 -> c[x]
	shift right b[wp]
	if c[xs] = 0
	go to @031
	shift right a[wp]
	c + 1 -> c[x]
	go to @035
	shift right a[w]
	shift right b[w]
	c -> stack
	b exchange c[w]
	go to @101
	b exchange c[w]
	4 -> p
	go to @336
	c -> stack
	a exchange c[w]
	if c[p] = 0
	go to @055
	0 - c -> c[w]
	c -> a[w]
	b -> c[x]
	go to @313
	c -> a[w]
	if s1 = 0
	go to @045
	if s10 = 0
	go to @155
	if s5 = 0
	go to @025
	0 - c - 1 -> c[s]
	a exchange c[s]
	go to @015
	shift right b[wp]
	a - 1 -> a[s]
	go to @072
	c + 1 -> c[s]
	a exchange b[wp]
	a + c -> c[wp]
	a exchange b[w]
	a -> b[w]
	a - c -> a[wp]
	go to @073
	stack -> a
	shift right a[w]
	a exchange c[wp]
	a exchange b[w]
	shift left a[wp]
	c -> stack
	a + 1 -> a[s]
	a + 1 -> a[s]
	go to @043
	0 -> c[w]
	0 -> b[x]
	c + 1 -> c[p]
	jsb @267
	c - 1 -> c[p]
	stack -> a
	a exchange c[w]
	4 -> p
	jsb @244
	6 -> p
	jsb @233
	8 -> p
	jsb @233
	2 -> p
	load constant 8
	10 -> p
	jsb @233
	jsb @216
	jsb @233
	jsb @314
	shift left a[w]
	jsb @233
	b -> c[w]
	jsb @313
	jsb @314
	c + c -> c[w]
	jsb @246
	if s9 = 0
	go to @154
	0 - c - 1 -> c[s]
	jsb @230
	0 -> s1
	0 -> c[w]
	c - 1 -> c[p]
	c + 1 -> c[x]
	if s1 = 0
	go to @245
	jsb @246
	jsb @314
	c + c -> c[w]
	jsb @245
	jsb @314
	c + c -> c[w]
	c + c -> c[w]
	jsb @225
	c + c -> c[w]
	jsb @353
	jsb @314
	10 -> p
	jsb @234
	jsb @216
	8 -> p
	jsb @235
	2 -> p
	load constant 8
	6 -> p
	jsb @234
	4 -> p
	jsb @234
	jsb @234
	a exchange b[w]
	shift right c[w]
	13 -> p
	load constant 5
	go to @373
	6 -> p
	load constant 8
	load constant 6
	load constant 5
	load constant 2
	load constant 4
	load constant 9
	if s1 = 0
	go to @332
	return
	0 -> a[w]
	a + 1 -> a[p]
	select rom 0
	select rom 2
	shift left a[w]
	shift right b[ms]
	b exchange c[w]
	go to @241
	c + 1 -> c[s]
	a - b -> a[w]
	go to @240
	a + b -> a[w]
	select rom 2
	select rom 2
	a - c -> c[x]
	select rom 2
	c + 1 -> c[p]
	a - c -> a[w]
	go to @250
	a + c -> a[w]
	shift left a[w]
	p - 1 -> p
	shift right c[wp]
	if p # 0
	go to @251
	go to @055
	c + 1 -> c[p]
	a - b -> a[ms]
	go to @262
	a + b -> a[ms]
	shift left a[ms]
	p - 1 -> p
	if p # 0
	go to @263
	go to @055
	p - 1 -> p
	a + b -> a[ms]
	go to @333
	select rom 0
	c - 1 -> c[xs]
	c - 1 -> c[xs]
	0 -> a[x]
	a - c -> a[s]
	if a[s] >= 1
	go to @306
	select rom 2
	if a >= b[m]
	go to @312
	0 - c - 1 -> c[s]
	a exchange b[w]
	a - b -> a[w]
	select rom 2
	0 -> c[w]
	11 -> p
	load constant 7
	load constant 8
	load constant 5
	load constant 3
	load constant 9
	load constant 8
	load constant 1
	load constant 6
	load constant 3
	load constant 5
	12 -> p
	return
	select rom 0
	a + b -> a[x]
	go to @336
	c - 1 -> c[p]
	c + 1 -> c[s]
	if p # 0
	go to @273
	a exchange c[x]
	0 -> a[x]
	if c[p] >= 1
	go to @346
	shift right a[w]
	shift right c[w]
	b exchange c[x]
	0 -> c[x]
	12 -> p
	go to @256
	select rom 2
	shift right b[wp]
	shift right b[wp]
	c - 1 -> c[s]
	go to @354
	a + c -> c[wp]
	a - b -> a[wp]
	b exchange c[wp]
	b -> c[w]
	a - 1 -> a[s]
	go to @356
	a exchange c[wp]
	stack -> a
	if b[s] = 0
	go to @001
	shift left a[w]
	a exchange c[wp]
	c -> stack
	shift right b[wp]
	c - 1 -> c[s]
	b exchange c[s]
	select rom 0
	a exchange b[s]
	a + 1 -> a[s]
	shift right c[ms]
	shift left a[wp]
	go to @022
	stack -> a
	jsb @246
	c -> a[w]
	if s8 = 0
	go to @103
	0 -> a[w]
	a - c -> a[m]
	go to @000
	shift right a[w]
	c - 1 -> c[s]
	go to @000
	c + 1 -> c[s]
	a -> b[w]
	jsb @226
	a - 1 -> a[p]
	go to @021
	a exchange b[wp]
	a -> b[s]
	a + b -> a[s]
	go to @001
	7 -> p
	jsb @155
	8 -> p
	jsb @235
	9 -> p
	jsb @234
	jsb @376
	10 -> p
	jsb @234
	jsb @175
	11 -> p
	jsb @234
	jsb @337
	jsb @234
	jsb @271
	jsb @234
	jsb @366
	a exchange c[w]
	a - c -> c[w]
	if b[xs] = 0
	go to @060
	a - c -> c[w]
	a exchange b[w]
	p - 1 -> p
	shift left a[w]
	if p # 1
	go to @061
	a exchange c[w]
	if c[s] = 0
	go to @071
	0 - c - 1 -> c[m]
	c + 1 -> c[x]
	11 -> p
	jsb @305
	if s9 = 0
	go to @006
	if s5 = 0
	go to @224
	jsb @366
	jsb @247
	go to @224
	jsb @366
	jsb @354
	0 -> b[ms]
	jsb @271
	11 -> p
	jsb @233
	jsb @337
	10 -> p
	jsb @233
	jsb @175
	9 -> p
	jsb @233
	jsb @376
	8 -> p
	jsb @233
	jsb @233
	jsb @233
	13 -> p
	b exchange c[w]
	a exchange c[w]
	load constant 6
	go to @216
	if s2 = 0
	go to @136
	a + 1 -> a[x]
	if a[xs] >= 1
	go to @302
	a - b -> a[ms]
	go to @131
	a + b -> a[ms]
	shift left a[w]
	c - 1 -> c[x]
	go to @134
	shift right a[w]
	0 -> c[wp]
	a exchange c[x]
	if c[s] = 0
	go to @154
	a exchange b[w]
	a - b -> a[w]
	0 - c - 1 -> c[x]
	shift right a[w]
	b exchange c[w]
	0 -> c[w]
	c - 1 -> c[m]
	if s2 = 0
	go to @166
	load constant 4
	c + 1 -> c[m]
	go to @171
	load constant 6
	if p # 1
	go to @165
	shift right c[w]
	shift right c[w]
	if s2 = 0
	go to @224
	return
	7 -> p
	load constant 3
	load constant 3
	load constant 0
	load constant 8
	load constant 5
	load constant 0
	load constant 9
	go to @352
	jsb @226
	a + 1 -> a[p]
	a -> b[w]
	c - 1 -> c[s]
	go to @206
	shift right a[wp]
	a exchange c[w]
	shift left a[ms]
	a exchange c[w]
	a - 1 -> a[s]
	go to @210
	0 -> a[w]
	a + 1 -> a[p]
	jsb @304
	select rom 1
	shift right a[wp]
	a - 1 -> a[s]
	go to @225
	a + b -> a[wp]
	a exchange b[s]
	return
	select rom 1
	shift right a[w]
	b exchange c[w]
	go to @240
	a + b -> a[w]
	c - 1 -> c[s]
	go to @237
	a exchange c[w]
	shift left a[ms]
	a exchange c[w]
	go to @155
	3 -> p
	a + c -> c[x]
	a - c -> c[s]
	go to @253
	0 - c -> c[s]
	a exchange b[m]
	0 -> a[w]
	if p # 12
	go to @305
	if c[m] >= 1
	go to @266
	if s1 = 0
	go to @000
	b -> c[wp]
	a - 1 -> a[m]
	c + 1 -> c[xs]
	b exchange c[wp]
	a exchange c[m]
	select rom 1
	0 -> s8
	load constant 6
	load constant 9
	load constant 3
	load constant 1
	load constant 4
	load constant 7
	load constant 1
	go to @346
	a + 1 -> a[m]
	go to @144
	a + b -> a[w]
	c - 1 -> c[p]
	go to @304
	shift right a[w]
	p + 1 -> p
	if p # 13
	go to @305
	c + 1 -> c[x]
	0 -> a[s]
	12 -> p
	0 -> b[w]
	if a[p] >= 1
	go to @326
	shift left a[w]
	c - 1 -> c[x]
	if a[w] >= 1
	go to @317
	0 -> c[w]
	a -> b[x]
	a + b -> a[w]
	if a[s] >= 1
	go to @307
	a exchange c[m]
	c -> a[w]
	0 -> b[w]
	12 -> p
	go to @172
	9 -> p
	load constant 3
	load constant 1
	load constant 0
	load constant 1
	load constant 7
	load constant 9
	load constant 8
	load constant 0
	load constant 5
	load constant 5
	load constant 3
	go to @335
	a exchange c[w]
	a -> b[w]
	c -> a[m]
	c + c -> c[xs]
	go to @136
	c + 1 -> c[xs]
	shift right a[w]
	c + 1 -> c[x]
	go to @362
	go to @147
	0 -> c[w]
	12 -> p
	load constant 2
	load constant 3
	load constant 0
	load constant 2
	load constant 5
	go to @201
	5 -> p
	go to @176

