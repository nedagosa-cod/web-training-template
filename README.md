# Plantilla Web Training React

Pagina web con disitintos desarrollos enfocados a formación.

## Check List Structure

#### The main structure to start creating a checklist, we need a JSON file on the Checklist/BASES folder with the next structure:

```http
  {
	"TITLE": "TITULO CHECKLIST",
	"DESCRIPCIONES": [
		{
			"check": "A",
			"html": []
        },
		{
			"check": "B",
			"html": []
        }
    ]
  }
```

#### on the file JSON we have "html": [ ] the sctructe of tis array is next with the description or information that checklist show

```http
  "html": [
				{ "TITULO": "Protocolo Bienvenida" },
				{"P": "1. El &tip[tooltip texto informativos]texto&tip &bolddescriptivo&bold,
				en este caso un retrato de una persona, provoca en el &tip[significado de receptor]receptor&tip una
				imagen tal que la realidad &bolddescripta&bold cobra forma, se materializa en su mente."},
				{"BTN_JUMP": "Continuar desde el paso 'C'", "TO": "C"},
				{"P": "2. Lorem ipsum dolor sit amet consectetur &tip[Puede ser una informacion
				mas extensa del significado de esto] adipisicing&tip elit. Ipsam porro, &boldquisquam
				consectetur provident&bold suscipit atque!"},
				{ "IMG": "logoSIn.png" },
				{ "SUBTITLE": "Subtitulo de la pagina" },
				{ "LINK": "http://www.youtube.com", "NAME": "YouTube" },
        ]
```

#### How to create Right Side (Description)

| JSON          | CHILDREN     | PROPS                      |
| :------------ | :----------- | :------------------------- |
| `"P"`         | `text`       | &bold - &tip[ ] - &tip     |
| `"LINK"`      | `url`        | "NAME"                     |
| `"BTN_JUMP"`  | `url`        | "NAME"                     |
| `"IMG"`       | `name image` |                            |
| `"SUBTITLE"`  | `text`       |                            |
| `"LIST"`      | `array`      |                            |
| `"IMPORTANT"` | `text`       | "TITLE"                    |
| `"IMPORTANT"` | `text`       | "TITLE"                    |
| `"SCRIPT"`    | `text`       |                            |
| `"DATA_TEXT"` | `text`       | \* "POS"                   |
| `"DATA_DATE"` | `text`       | \* "POS"                   |
| `"DATA_BOOL"` | `text`       | _ "POS" - _ "SI" - \* "NO" |
| `"DATA_LIST"` | `text`       | \* "TO"                    |
