import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import NavbarPrimary from '../../../components/NavbarPrimary'

const TermScreen = () => {
  return (
    <View className="flex-1 bg-secondary">
        <NavbarPrimary title='Términos y condiciones'/>
      <ScrollView className="flex-1">
        <View className="bg-inputPrimary p-4 m-4 rounded-md">
            <Text className="text-white font-semibold text-base">Condiciones para los proveedores de servicios.</Text>
            <Text className="text-lightGray text-sm">
                El objeto del Sitio es proporcionar una plataforma en línea para permitir que las personas que prestan servicios (el &quot;Proveedor&quot; o &quot;usted&quot;) y las personas que desean hacer uso de los servicios y pagar por ellos (el &quot;Cliente&quot;) se conecten entre sí. El Sitio tiene por objeto permitir a los Proveedores ofrecer sus servicios en respuesta a la búsqueda y solicitud por parte de un Cliente de diversos servicios (los &quot;Servicios&quot;).

                Todo uso del Sitio estará sujeto a las presentes Condiciones y, al utilizar el Sitio de cualquier forma, usted acepta quedar vinculado por las presentes Condiciones en su totalidad. Se recomienda imprimir y conservar una copia de estas Condiciones para futuras consultas.

                El uso de los datos personales recogidos en virtud del acceso al Sitio se rige por nuestra Política de Privacidad. Nos reservamos el derecho a modificar estas Condiciones y la Política de Privacidad de vez en cuando publicando versiones actualizadas de las mismas en el Sitio. Usted es responsable de comprobar las actualizaciones de vez en cuando. La continuación de la oferta de Servicios a través del Sitio tras la actualización de las Condiciones se considerará aceptación de las Condiciones actualizadas.

            </Text>

        </View>

        <View className="bg-inputPrimary p-4 m-4 rounded-md">
            <Text className="text-white font-semibold text-base">¿Qué hacemos?</Text>
            <Text className="text-lightGray text-sm">
            Evently opera un sitio web que conecta a las empresas con los proveedores de servicios para eventos pertinentes a partir de una única solicitud de servicio.

            Evently clasifica a los proveedores por palabras clave. Los clientes pueden acceder fácilmente a todos los sectores mediante una sencilla búsqueda desplegable. Una vez elegido un proveedor, Evently procede a formular de forma inteligente al cliente las preguntas pertinentes sobre el servicio requerido. Una vez contestadas todas las preguntas, Evently envía la solicitud del cliente a todos los proveedores de su base de datos que estén registrados en la categoría elegida por el cliente.

            Los proveedores interesados pueden entonces enviar un presupuesto al cliente en un escenario competitivo. Un número finito de proveedores puede hacer esto para cualquier solicitud dada por orden de llegada.

            El Cliente puede entonces, aunque no está obligado a ello, elegir el presupuesto que le resulte más favorable dentro de un plazo determinado.
            El Proveedor seleccionado por el Cliente abona a Evently un crédito por solicitud de cliente atendida.

            </Text>

        </View>

        <View className="bg-inputPrimary p-4 m-4 rounded-md">
            <Text className="text-white font-semibold text-base">Datos de inicio de sesión</Text>
            <Text className="text-lightGray text-sm">
            Al registrarse, se le pedirá que elija entre una lista de Servicios que presta. El Sitio admite varias categorías de servicios, que están sujetas a cambios de vez en cuando.

            Si se acepta su registro, le facilitaremos un nombre de usuario y una contraseña (los &quot;Datos de acceso&quot;). Al registrarse como Proveedor con nosotros, acepta que sus Datos de acceso deben mantenerse confidenciales. Usted será responsable de todas y cada una de las actividades que se lleven a cabo con sus datos de acceso. Si tiene conocimiento o sospecha de cualquier uso no autorizado de sus datos de acceso, o de cualquier otra violación de la seguridad, está obligado a notificárnoslo inmediatamente a hello@evently.eu. En caso contrario, tendremos derecho a cancelar su cuenta y su registro en el Sitio.

            A menos que nos haya notificado previamente por escrito a hello@evently.eu que la confidencialidad de sus credenciales se ha visto comprometida, tenemos derecho a tratar cualquier uso del Sitio (incluida cualquier cotización de Servicios a través del Sitio) con sus credenciales como atribuible exclusivamente a usted.

            </Text>

        </View>

      </ScrollView>
    </View>
  )
}

export default TermScreen
