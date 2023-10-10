# Mic Toggle Applet for Linux Mint Cinnamon

O "Mic Toggle" é um applet para o ambiente de desktop Cinnamon no Linux Mint. Ele permite que os usuários visualizem e alterem o status de mute do microfone padrão diretamente da barra.

## Características

- **Indicação Visual:** Exibe um ícone intuitivo na barra que mostra o status atual do microfone.
- **Toggle Simples:** Um único clique no ícone alterna o status de mute do microfone.
- **Atualização Imediata:** Depois de alterar o status do microfone, o ícone é atualizado imediatamente para refletir o novo status.

## Requisitos

- Linux Mint com ambiente de desktop Cinnamon.
- Dependências: `pactl` (geralmente vem pré-instalado com sistemas que usam PulseAudio).

## Instalação

1. Clone este repositório ou baixe o código-fonte.
2. Copie o diretório `mic-toggle@vbsantos` para `~/.local/share/cinnamon/applets/`.
3. Reinicie o Cinnamon (`Alt+F2`, digite `r`, e pressione `Enter`).
4. Adicione o applet ao seu painel pelo menu de applets do Cinnamon.

## Uso

Uma vez adicionado ao painel, o ícone do applet refletirá o status atual do microfone:

- **Microfone On:** O ícone mostrará `mic-on`.
- **Microfone Off:** O ícone mostrará `mic-ready`.

Clique no ícone a qualquer momento para alternar o status de mute do microfone.
