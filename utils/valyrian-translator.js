// valyrian-translator.js
// Translates texts to mimimi Valyrian:
/* RULES:
* - Every vocal will be turned into an i.
* - If this makes there is 2 'i' together, the second one will be 'í',
* - Character 'u' on 'que' or 'qui' will remain.
* - Character 'u' on 'gue' or 'gui' will remain.
*/

const rules = [
  {regex: /(q)u(?=e)/gm, traduction: '@@#@@'}, // que
  {regex: /(Q)u(?=e)/gm, traduction: '@##@@'}, // Que
  {regex: /(q)u(?=i)/gm, traduction: '@@###'}, // qui
  {regex: /(Q)u(?=i)/gm, traduction: '@####'}, // Qui
  {regex: /(g)u(?=e)/gm, traduction: '###@@'}, // gue
  {regex: /(G)u(?=e)/gm, traduction: '#@#@@'}, // Gue
  {regex: /(g)u(?=i)/gm, traduction: '#####'}, // gui
  {regex: /(G)u(?=i)/gm, traduction: '#@###'}, // Gui

  {regex: /a|e|o|u/gm, traduction: 'i'},
  {regex: /á|é|ó|ú/gm, traduction: 'í'},
  {regex: /à|è|ò|ù/gm, traduction: 'ì'},
  {regex: /A|E|O|U/gm, traduction: 'I'},
  {regex: /Á|É|Ó|Ú/gm, traduction: 'Í'},
  {regex: /À|È|Ò|Ù/gm, traduction: 'Ì'},

  {regex: /@@#@@|@@###/gm, traduction: 'qu'}, // que
  {regex: /@##@@|@####/gm, traduction: 'Qu'}, // Que
  {regex: /###@@|#####/gm, traduction: 'gu'}, // gue
  {regex: /#@#@@|#@###/gm, traduction: 'Gu'}, // Gue

  {regex: /ii/gm, traduction: 'ií'},
  {regex: /Ii/gm, traduction: 'Ií'},
  {regex: /iI/gm, traduction: 'iÍ'},
  {regex: /II/gm, traduction: 'IÍ'}
]

const toValyrian = function (text) {
  const filteredText = text || ''
  let traduction = filteredText
  for (let i = 0; i < rules.length; i++) {
    traduction = traduction.replace(rules[i].regex, rules[i].traduction)
  }
  return traduction
}

module.exports = toValyrian
