const Mentions = () => {
  return (
    <div className="flex justify-center p-20 pb-25 items-stretch">
      <div className="max-w-4xl text-gray-800 space-y-8">
        <h1 className="text-3xl font-title font-bold text-center mb-8">
          Mentions légales
        </h1>

        <section>
          <h2 className="text-xl font-title font-bold mb-2">Hébergement</h2>
          <p className="font-body mb-2">A déterminer</p>
          <p className="font-body mb-2">
            Site web :{" "}
            <a href="" className="text-yellow-700 hover:underline">
              A déterminer
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-title font-bold mb-2">
            Propriété intellectuelle
          </h2>
          <p className="font-body mb-2">
            Le contenu du site BlaBlaBook (textes, images, code, etc.) est
            protégé par les lois en vigueur. Toute reproduction ou usage non
            autorisé est interdit.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-title font-bold mb-2">
            Données personnelles
          </h2>
          <p className="font-body mb-2">
            BlaBlaBook collecte des données personnelles uniquement pour assurer
            ses fonctionnalités. Conformément au RGPD, vous pouvez demander la
            suppression ou la modification de vos données à :
            contact@blablabook.fr
          </p>
        </section>

        <section>
          <h2 className="text-xl font-title font-bold mb-2">Cookies</h2>
          <p className="font-body mb-2">
            Des cookies peuvent être utilisés pour améliorer l’expérience
            utilisateur. Vous pouvez les désactiver dans les paramètres de votre
            navigateur.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-title font-bold mb-2">
            Limitation de responsabilité
          </h2>
          <p className="font-body mb-2">
            BlaBlaBook ne peut être tenu responsable des erreurs ou
            interruptions de service, ni des dommages liés à l’utilisation du
            site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-title font-bold mb-2">Crédits</h2>
          <p className="font-body mb-2">
            Icônes via FontAwesome, images via Unsplash.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Mentions;