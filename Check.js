const fs = require('fs')
const path = require('path')

const protocol_A = fs.readFileSync(path.join('opcodes', 'protocol.376012.map'), "utf-8").split("\n")
let defs = new Map(), maps = new Map()
for (var value of protocol_A) {
	if (value.charAt(0) == "#") continue
	var line = value.split(" ")
	defs.set(line[0], Number(line[1]))
	maps.set(Number(line[1]), line[0])
}
// log(defs.size)
// log(maps.size)
const protocol_B = require('./data.json')['maps']['376012']
// log(Object.keys(protocol_B).length)
let i = 0, j = 0
for (var value in protocol_B) {
	if (defs.get(value) == undefined) {
		// log(`[undefined] ${value}`)
	} else if (defs.get(value) != protocol_B[value]) {
		log(`${++i}[def is wrong opcode] ${value} ${protocol_B[value]}`)
	} else {
		// log(`[def==opcode] ${value} ${protocol_B[value]}`)
	}
}
log(`-------------------------------------`)
for (var value in protocol_B) {
	if (maps.get(protocol_B[value]) == undefined) {
		// log(`[undefined] ${value}`)
	} else if (maps.get(protocol_B[value]) != value) {
		log(`${++j}[opcode is wrong def] ${protocol_B[value]} ${value}`)
	} else {
		// log(`[opcode==def] ${protocol_B[value]} ${value}`)
	}
}
function log(msg) { console.log(msg) }
