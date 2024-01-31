{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    purescript-overlay = {
      url = "github:thomashoneyman/purescript-overlay";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = inputs@{ self, nixpkgs, ... }:
    let
      supportedSystems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];

      forAllSystems = inputs.nixpkgs.lib.genAttrs supportedSystems;

      nixpkgsFor = forAllSystems (system: import inputs.nixpkgs {
        inherit system;
        config = {};
        overlays = builtins.attrValues inputs.self.overlays;
      });
    in
      {
        overlays = {
          purescript = inputs.purescript-overlay.overlays.default;
        };

        packages = forAllSystems (system:
          let pkgs = nixpkgsFor.${system}; in {
            default = pkgs.callPackage ./default.nix { nodePackages = pkgs.nodePackages_latest; };
          });

        devShells = forAllSystems (system:
          let pkgs = nixpkgsFor.${system}; in {
            default = pkgs.mkShell {
              name = "kak-jump devshell";
              inputsFrom = builtins.attrValues self.packages.${system};
              buildInputs = with pkgs; [
                # kakoune
                kakoune-unwrapped

                # node
                nodejs-slim_21
                esbuild

                # purescript
                purs
                spago-unstable
                purs-tidy
                purs-backend-es
                purescript-language-server
              ];
            };
          });

      };
}

