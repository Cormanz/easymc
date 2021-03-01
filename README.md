The `easymc` package, an API for the `easymc.io` website. EasyMC is a site, similar to MCLeaks and TheAltening, where it lets you get tokens to login to accounts with, using their own auth servers. It allows you to login with Minecraft accounts.

Unfortunately, this package doesn\'t support renewing alts since that requires automating the captcha, but it does allow for getting alts.

## Getting Started

Here\'s an example of `easymc`:

```ts
import easymc from 'easymc';

async function main() {
	const alt = await easymc.alt();
	console.log(`Token is ${alt.token}, Username is ${alt.username}`);
}

main();
```

It lets you get the alt using `easymc.alt()` and logs the token name and username. Note that the username usually is partially `*`s.

You can also get the skin of an alt.

```ts
const alt = await easymc.alt();
const skin = await alt.getSkin();
```

If you want to access the API at a lower level, you can do so like so:
```ts
const altData = await easymc.get('/?new=True');
```

Finally, seprately from the default import of the module are the `authServer` and `sessionServer` values.

```ts
import easymc, { authServer, sessionServer } from 'easymc';
```
These can be used with packages like `mineflayer` or `node-minecraft-protocol` to let you login to EasyMC alts in theory.
