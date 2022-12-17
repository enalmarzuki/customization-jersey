import React from "react";

export const ButtonWhatsapp = () => {
  const noHp = "+6289653354679";
  const tempTextWA =
    "Terimakasih telah menghubungi NevsApparel. Saat ini anda sedang terhubung dengan Admin BIYA . Silahkan beri tahu apa yang dapat kami bantu. Terimkasih 😇";
  const textWA = tempTextWA.replace(" ", "%20");

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
      />
      <a
        href={`https://api.whatsapp.com/send?phone=${noHp}&text=${textWA}`}
        className="float"
        target="_blank"
      >
        <i className="fa fa-whatsapp my-float" />
      </a>
    </div>
  );
};
