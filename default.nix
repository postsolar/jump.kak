{ stdenvNoCC
, purix
, esbuild
, purs-backend-es
, nodePackages
}:

let

  spagoLock = purix.buildSpagoLock {
    src = ./.;
    lockfile = ./spago.lock;
    corefn = true;
  };

  inherit (nodePackages) nodejs;

in

  stdenvNoCC.mkDerivation {
    pname = "kak-jump";
    version = "0.2.1";

    src = ./.;

    nativeBuildInputs = [ purs-backend-es esbuild ];

    buildPhase = ''
      cp -r ${spagoLock.kak-jump}/output .
      purs-backend-es build
      purs-backend-es bundle-app --platform=node
      '';

    installPhase = ''
      mkdir $out
      substituteInPlace jump.kak --replace node "${nodejs}/bin/node"
      cp jump.kak package.json performJump.js index.js $out
      '';

  }
