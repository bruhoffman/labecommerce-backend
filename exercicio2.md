# Exercício 2

Agora que temos uma aplicação typescript configurada, podemos criar tipagens para nossos dados.<br>
No projeto Labecommerce temos 2 entidades básicas (as outras tabelas são de relação, que veremos nas aulas de banco de dados):

## users

É a pessoa cliente cadastrada.

- id (string)
- name (string)
- email (string)
- password (string)
- createdAt (string no formato ano-mês-dia T hora:minuto:segundo:milésimo-de-segundos Z)

## products

É o produto cadastrado.

- id (string)
- name (string)
- price (number)
- description (string)
- imageUrl (string)

## Crie tipagens para cada uma das entidades acima

- lembre-se de referenciar o material assíncrono
- crie um arquivo dentro da pasta src chamado de types.ts
- coloque o código das tipagens dentro do types.ts e exporte-as

exemplo:

```
// estamos dentro do arquivo src/types.ts tipando um vídeo do youtube

export type TVideo = {
  id: string,
  channelId: string,
  title: string,
  description: string,
  durationInSeconds: number,
  views: number
}
```
