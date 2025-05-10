export const htmlEmailResetPassword = (urlReset: string, pharmacyName: string, year: string) => {
  return `
  <!DOCTYPE html>
  <html lang="es" style="padding:0;Margin:0">
  
  <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>restablecimiento de contraseña</title>
    <style type="text/css">
      #outlook a {
        padding: 0;
      }
  
      .ExternalClass {
        width: 100%;
      }
  
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: 100%;
      }
  
      .es-button {
        text-decoration: none !important;
      }
  
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
  
      .es-desk-hidden {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
      }
  
      @media only screen and (max-width:600px) {
  
        p,
        ul li,
        ol li,
        a {
          line-height: 150% !important
        }
  
        h1,
        h2,
        h3,
        h1 a,
        h2 a,
        h3 a {
          line-height: 120% !important
        }
  
        h1 {
          font-size: 30px !important;
          text-align: center
        }
  
        h2 {
          font-size: 26px !important;
          text-align: center
        }
  
        h3 {
          font-size: 20px !important;
          text-align: center
        }
  
        .es-header-body h1 a,
        .es-content-body h1 a,
        .es-footer-body h1 a {
          font-size: 30px !important
        }
  
        .es-header-body h2 a,
        .es-content-body h2 a,
        .es-footer-body h2 a {
          font-size: 26px !important
        }
  
        .es-header-body h3 a,
        .es-content-body h3 a,
        .es-footer-body h3 a {
          font-size: 20px !important
        }
  
        .es-menu td a {
          font-size: 16px !important
        }
  
        .es-header-body p,
        .es-header-body ul li,
        .es-header-body ol li,
        .es-header-body a {
          font-size: 16px !important
        }
  
        .es-content-body p,
        .es-content-body ul li,
        .es-content-body ol li,
        .es-content-body a {
          font-size: 16px !important
        }
  
        .es-footer-body p,
        .es-footer-body ul li,
        .es-footer-body ol li,
        .es-footer-body a {
          font-size: 16px !important
        }
  
        .es-infoblock p,
        .es-infoblock ul li,
        .es-infoblock ol li,
        .es-infoblock a {
          font-size: 12px !important
        }
  
        *[class="gmail-fix"] {
          display: none !important
        }
  
        .es-m-txt-c,
        .es-m-txt-c h1,
        .es-m-txt-c h2,
        .es-m-txt-c h3 {
          text-align: center !important
        }
  
        .es-m-txt-r,
        .es-m-txt-r h1,
        .es-m-txt-r h2,
        .es-m-txt-r h3 {
          text-align: right !important
        }
  
        .es-m-txt-l,
        .es-m-txt-l h1,
        .es-m-txt-l h2,
        .es-m-txt-l h3 {
          text-align: left !important
        }
  
        .es-m-txt-r img,
        .es-m-txt-c img,
        .es-m-txt-l img {
          display: inline !important
        }
  
        .es-button-border {
          display: inline-block !important
        }
  
        a.es-button,
        button.es-button {
          font-size: 18px !important;
          display: inline-block !important
        }
  
        .es-btn-fw {
          border-width: 10px 0px !important;
          text-align: center !important
        }
  
        .es-adaptive table,
        .es-btn-fw,
        .es-btn-fw-brdr,
        .es-left,
        .es-right {
          width: 100% !important
        }
  
        .es-content table,
        .es-header table,
        .es-footer table,
        .es-content,
        .es-footer,
        .es-header {
          width: 100% !important;
          max-width: 600px !important
        }
  
        .es-adapt-td {
          display: block !important;
          width: 100% !important
        }
  
        .adapt-img {
          width: 100% !important;
          height: auto !important
        }
  
        .es-m-p0 {
          padding: 0px !important
        }
  
        .es-m-p0r {
          padding-right: 0px !important
        }
  
        .es-m-p0l {
          padding-left: 0px !important
        }
  
        .es-m-p0t {
          padding-top: 0px !important
        }
  
        .es-m-p0b {
          padding-bottom: 0 !important
        }
  
        .es-m-p20b {
          padding-bottom: 20px !important
        }
  
        .es-mobile-hidden,
        .es-hidden {
          display: none !important
        }
  
        tr.es-desk-hidden,
        td.es-desk-hidden,
        table.es-desk-hidden {
          width: auto !important;
          overflow: visible !important;
          float: none !important;
          max-height: inherit !important;
          line-height: inherit !important
        }
  
        tr.es-desk-hidden {
          display: table-row !important
        }
  
        table.es-desk-hidden {
          display: table !important
        }
  
        td.es-desk-menu-hidden {
          display: table-cell !important
        }
  
        .es-menu td {
          width: 1% !important
        }
  
        table.es-table-not-adapt,
        .esd-block-html table {
          width: auto !important
        }
  
        table.es-social {
          display: inline-block !important
        }
  
        table.es-social td {
          display: inline-block !important
        }
  
        .es-desk-hidden {
          display: table-row !important;
          width: auto !important;
          overflow: visible !important;
          max-height: inherit !important
        }
      }
  
      @media screen and (max-width:384px) {
        .mail-message-content {
          width: 414px !important
        }
      }
    </style>
  </head>
  
  <body
    style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
    <div dir="ltr" class="es-wrapper-color" lang="es" style="background-color:#FFFFFF">
      <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none"
        style="border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FFFFFF">
        <tr style="border-collapse:collapse">
          <td valign="top" style="padding:0;Margin:0">
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none"
              style="border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
              <tr style="border-collapse:collapse">
                <td align="center" bgcolor="#eff5ff" style="padding:0;Margin:0;background-color:#eff5ff">
                  <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"
                    role="none" style="border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                    <tr style="border-collapse:collapse">
                      <td align="left" style="padding:0;Margin:0;padding-top:20px">
                        <table width="100%" cellspacing="0" cellpadding="0" role="none"
                          style="border-collapse:collapse;border-spacing:0px">
                          <tr style="border-collapse:collapse">
                            <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
                              <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                                style="border-collapse:collapse;border-spacing:0px">
                                <tr style="border-collapse:collapse">
                                  <td align="center" style="padding:0;Margin:0">
                                    <p
                                      style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:36px;color:#333333;font-size:24px">
                                      <strong>RESTABLECIMIENTO DE CONTRASEÑA</strong><br type="_moz">
                                    </p>
                                  </td>
                                </tr>
                                <tr style="border-collapse:collapse">
                                  <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img"
                                      src="https://mzntpa.stripocdn.email/content/guids/CABINET_066b0b3b5ceef52bfc66b3e79646ddccf18d64dabe302d35bfd9615d25f729db/images/mailbox2.png"
                                      alt
                                      style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                      width="352"></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none"
              style="border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
              <tr style="border-collapse:collapse">
                <td align="center" bgcolor="#eff5ff" style="padding:0;Margin:0;background-color:#eff5ff">
                  <table class="es-content-body"
                    style="border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;border-top:1px solid transparent;border-right:1px solid transparent;border-left:1px solid transparent;width:600px;border-bottom:1px solid transparent"
                    cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none">
                    <tr style="border-collapse:collapse">
                      <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:40px">
                        <table width="100%" cellspacing="0" cellpadding="0" role="none"
                          style="border-collapse:collapse;border-spacing:0px">
                          <tr style="border-collapse:collapse">
                            <td align="left" style="padding:0;Margin:0;width:558px">
                              <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                                style="border-collapse:collapse;border-spacing:0px">
                                <tr style="border-collapse:collapse">
                                  <td class="es-m-txt-c" align="center" style="padding:0;Margin:0">
  
                                  </td>
                                </tr>
                                <tr style="border-collapse:collapse">
                                  <td class="es-m-txt-c" align="center" style="padding:0;Margin:0;padding-top:15px">
                                    <p
                                      style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">
                                      Le contactamos desde la plataforma de OpenFiber en relación a su reciente
                                      solicitud de restablecimiento de contraseña en nuestra plataforma.</p>
                                    <p
                                      style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">
                                      <br>
                                    </p>
                                  </td>
                                </tr>
                                <tr style="border-collapse:collapse">
                                  <td align="center"
                                    style="padding:0;Margin:0;padding-left:10px;padding-right:10px;padding-top:15px"><span
                                      class="es-button-border"
                                      style="border-style:solid;border-color:#c6ddff;background:#c6ddff;border-width:0px;display:inline-block;border-radius:25px;width:auto"><a
                                        href="${urlReset}" class="es-button es-button-1709830637484" target="_blank"
                                        style="text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;color:#333333;font-size:16px;display:inline-block;background:#c6ddff;border-radius:25px;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-weight:normal;font-style:normal;line-height:19px;width:auto;text-align:center;padding:10px 25px;">Restablecer
                                        contraseña</a></span></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr style="border-collapse:collapse">
                      <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
                        <table cellpadding="0" cellspacing="0" width="100%" role="none"
                          style="border-collapse:collapse;border-spacing:0px">
                          <tr style="border-collapse:collapse">
                            <td align="center" valign="top" style="padding:0;Margin:0;width:558px">
                              <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                style="border-collapse:collapse;border-spacing:0px">
                                <tr style="border-collapse:collapse">
                                  <td align="center" style="padding:0;Margin:0">
                                    <p
                                      style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">
                                      <br>
                                    </p>
                                    <p
                                      style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#333333;font-size:16px">
                                      Le proporcionamos el enlace adjunto para que pueda proceder con la configuración de
                                      una nueva contraseña.</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table cellpadding="0" cellspacing="0" class="es-footer" align="center" role="none"
              style="border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
              <tr style="border-collapse:collapse">
                <td style="padding:0;Margin:0;background-color:#eff5ff" bgcolor="#eff5ff" align="center">
                  <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" bgcolor="#ffffff"
                    style="border-collapse:collapse;border-spacing:0px;background-color:#ffffff;width:600px" role="none">
                    <tr style="border-collapse:collapse">
                      <td align="left"
                        style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px">
                        <table width="100%" cellspacing="0" cellpadding="0" role="none"
                          style="border-collapse:collapse;border-spacing:0px">
                          <tr style="border-collapse:collapse">
                            <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                              <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                                style="border-collapse:collapse;border-spacing:0px">
                                <tr style="border-collapse:collapse">
                                  <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px">
                                    <p
                                      style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                      <span
                                        style="font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif">Agradecemos
                                        su confianza en nuestros servicios y quedamos a su disposición para brindarle
                                        cualquier asistencia que necesite</span>.
                                    </p>
                                  </td>
                                </tr>
                                <tr style="border-collapse:collapse">
                                  <td align="center" style="padding:0;Margin:0;padding-bottom:10px">
                                    <p
                                      style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                      Atentamente: El equipo técnico de OpenFiber<b> </b></p>
                                  </td>
                                </tr>
                                <tr style="border-collapse:collapse">
                                  <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px">
                                    <p
                                      style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                      CDS © ${year}</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
    <div style="position:absolute;left:-9999px;top:-9999px;margin:0px"></div>
  </body>
  </html>
`;
};