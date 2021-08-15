
# TopazBot - RTSP Discord Music bot for TopazChat

![49b54ba526ab1540bafd1bea6e593542](https://user-images.githubusercontent.com/35634920/129456355-da650b6d-37e1-4da0-a362-f056eebea238.png)

## �R�~���j�e�B
- TopazChat Discord

join: https://discord.com/invite/fCMcJ8A

## TopazBot�ɂ���
Node.js�p��Discord Voice API��TopazChat RTSP��p�̎����ŁAJavacript�ŏ�����Ă��܂��B

**����!!**

*�uTopazBot�v��MIT���C�Z���X���ɂ���܂����A�uTopazChat�v�͏��p���p�֎~�ł�*

**TopazBot�̓���:**

Discord�̉����`�����l���ŃI�[�f�B�I�𑗎�M����M�����Ɨ\���\�ȓ���ɏd�_��u���Ă��܂��B
���������̊g�����Adiscord.js�ȊO�̃��C�u�������J�X�^���A�_�v�^�ŃT�|�[�g���܂��B
�l�X�ȃI�[�f�B�I�\�[�X�ɑΉ��\�Ȉ��肵���ȃI�[�f�B�I�����V�X�e���ł��B

**TopazCha�ɂ���t:**

[TopazChat](https://booth.pm/ja/items/1752066)
�́A���i���E��x����RTSP�T�[�o�ł��B�l�ł̗��p�͖����ł��B
TopazChat�̔�p�́A�J���҂̂悵��������[@TyounanMOTI](https://github.com/TyounanMOTI)�����S���Ă��܂��B
�T�[�o�[�̈ێ���≹���E����z�M�̃f�[�^�]�����̂��߂�
��t�����肢���܂��I[FANBOX](https://tyounanmoti.fanbox.cc/)
TopazChat�̂��ׂẴX�|���T�[�́ASPONSORS.txt�ɋL�ڂ���Ă��܂��B


**�����N�W:**
- [TopazChat](https://booth.pm/ja/items/1752066)
- [Documentation](https://discordjs.github.io/voice)
- [Examples](https://github.com/discordjs/voice/tree/main/examples)
- [GitHub Discussions](https://github.com/discordjs/voice/discussions)
- [Discord.js Server](https://discord.gg/djs)
- [Repository](https://github.com/discordjs/voice)

## �ˑ��֌W
���̃��C�u�����́A���܂��܂ȃv���b�g�t�H�[�����T�|�[�g���邽�߂ɁA�������̃I�v�V�����̈ˑ��֌W������܂��B
�������̃I�v�V�����̈ˑ��֌W������܂��B�ȉ��̃J�e�S���[���炻�ꂼ��1���C���X�g�[�����Ă��������B
�C���X�g�[�����Ă��������B�ˑ��֌W�́A�p�t�H�[�}���X���D�悳��鏇�ɋL�ڂ���Ă��܂��B
�ˑ��֌W�́A�p�t�H�[�}���X�̗D�揇�ʂ��������ɋL�ڂ���Ă��܂��B�I�v�V������1���C���X�g�[���ł��Ȃ��ꍇ�́A�ʂ̃I�v�V�������C���X�g�[�����Ă݂Ă��������B
�ʂ̂��̂��C���X�g�[�����Ă݂Ă��������B

### Debian or Ubuntu

**node & npm:**

- `node`: >=14
- `npm`: >=6

**discord.js:**

- `discord.js`: ^13.0.0

**@discordjs/voice:**

- `@discordjs/voice`: ^0.6.0

**Encryption Libraries (npm install):**

- `sodium`: ^3.0.2

**Opus Libraries (npm install):**

- `@discordjs/opus`: ^0.5.3

**FFmpeg:**

- [`FFmpeg`](https://ffmpeg.org/) (�T�[�o�[�ɃC���X�g�[�����ĉ�����)
- `ffmpeg-static`: ^4.2.7 (npm install)

**dotenv (npm install):**

- `dotenv`: ^10.0.0

**pm2 (npm install): [�I�v�V����]**

- `pm2`

# TopazBot�̗�

�����@discordjs/voice���g���āA[discord.js](https://github.com/discordjs/discord.js)�ƈꏏ��TopazBot���쐬�����ł��B

���̗�ł́A���̃��C�u�������g�p���Ĉ��肵���Ȕz�M�V�X�e�����쐬������@�ɏœ_�𓖂ĂĂ��܂��B

�V���v���ȃX�g���[�~���OMusicBot����肽���Ǝv���Ă�����́A���̃T���v�����Q�l�ɂ��Ă݂Ă��������B

## �g����

```bash
# main���|�W�g������clone
$ git clone https://github.com/ROZ-MOFUMOFU-ME/TopazBot topazbot

# �t�H���_�Ɉړ����ĕK�v�ȃv���O�������C���X�g�[��
$ cd topazbot
$ npm install

# �g�[�N������������ (example.env�����Ă�)
$ vi .env

# �R�}���h�o�^
$ node register.js

# �v���O�����X�^�[�g
$ npm start

# pm2���g���ăv���O�����X�^�[�g
$ sudo npm i pm2 -g
$ pm2 start index.js --name TopazBot

# TopazBot����URL
$ https://discord.com/oauth2/authorize?client_id=<Application_ID>&permissions=105263402240&scope=bot%20applications.commands

# Discord�ōĐ�
$ /play StreamKey
```

## Code structure
���̃{�b�g�̃R�[�h��TopazChat��p�ł��B

�����Q�l�ɂ����R�[�h [Discord.js Japan user Group](https://scrapbox.io/discordjs-japan/]

[discordjs-japan/�������Đ�����](https://scrapbox.io/discordjs-japan/%E9%9F%B3%E5%A3%B0%E3%82%92%E5%86%8D%E7%94%9F%E3%81%99%E3%82%8B)

## �R���g���r���[�V����
����������������� [Contributing Guide](https://github.com/ROZ-MOFUMOFU-ME/topazbot/blob/main/.github/CONTRIBUTING.md).

## ��t
TopazChat�̃T�[�o�[�ێ����f�[�^�]�������A�J���҂̂悵�������񂪃J���p�����Ă��܂��B
 
* TopazChat [FANBOX](https://tyounanmoti.fanbox.cc/)

## �N���W�b�g
### TopazBot
 
* Aoi Emerauda [@ROZ-MOFUMOFU-ME](https://github.com/ROZ-MOFUMOFU-ME)

### TopazChat

* Hirotoshi Yoshitaka [@TyounanMOTI](https://github.com/TyounanMOTI)

## ���C�Z���X
MIT���C�Z���X�Ń����[�X����Ă��܂��BLICENSE�t�@�C�����������������B