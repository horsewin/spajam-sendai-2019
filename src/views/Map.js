import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { connect } from "react-redux";
import { restaurantSelect as restaurantSelectAction } from "../actions/restaurant";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  totalFooter: {
    backgroundColor: "#d0d0d0",
    height: 150,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 0,
    paddingBottom: 0,
    alignItems: "center",
    elevation: 0
  },
  footerContainer: {
    paddingTop: 0,
    paddingBottom: 0
  },
  restaurantImage: {
    flex: 1,
    width: 100,
    height: 100
  },
  restaurantNameGroup: {
    flex: 1,
    padding: 24
  },
  restaurantNameTop: {
    flex: 1,
    fontSize: 20,
    textAlign: "center"
  },
  restaurantNameBottom: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

class MapScreen extends React.Component {
  constructor(props, state) {
    super(props, state);

    this.state = {
      latitude: 37.78825,
      longitude: -122.4324,
      error: null,
      markerLatitude: null,
      markerLongitude: null
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  }

  render() {
    const { restaurantSelect, restaurant } = this.props;
    const {
      latitude,
      longitude,
      markerLatitude,
      markerLongitude,
      error
    } = this.state;

    let footer = null;
    if (markerLatitude && restaurant.img) {
      footer = (
        <View style={[styles.totalFooter, styles.footerContainer]}>
          <Image
            style={styles.restaurantImage}
            source={{ uri: restaurant.img }}
          />
          <View style={styles.restaurantNameGroup}>
            <Text style={styles.restaurantNameTop}>{restaurant.name}</Text>
            <View style={styles.restaurantNameBottom}>
              <Text>{restaurant.scoville}</Text>
              <Button title="OK" onPress={() => navigation.navigate("Image")} />
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
          onPress={event => {
            this.setState({
              markerLatitude: event.nativeEvent.coordinate.latitude,
              markerLongitude: event.nativeEvent.coordinate.longitude
            });

            // TODO APIたたいてと店名もらう
            const response = {
              name: "一蘭",
              scoville: 3,
              img:
                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSExMWFhUWGBgWFRYXFxcXGBgWFxUXFxYYGBUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGi0lICUtLS8tLS0tLS0tLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAIDBAYBBwj/xABFEAABAwIEAwYEBAMHAgQHAAABAAIRAyEEEjFBBVFhBhMicYGRMqGx8EJSwdFi4fEHFCNTcoKSM6IVFkOTJGNzg7LC4v/EABkBAAMBAQEAAAAAAAAAAAAAAAIDBAEABf/EACwRAAICAQMDAwIGAwAAAAAAAAABAhEDEiExBEFREyIyQmEUUnGBkaGx0eH/2gAMAwEAAhEDEQA/APIWyuh0bJNTlOVHQ4HZItbyXAu5llG2O7tqXctO64CnAhZTNseKA/MujDnmm2TmoaYWxc4UwsqNvqY916RwYaLy5riLgr03gNXM1ruYBRRE5UFuN8DZiKREXheT8S4Y+g8scD0PML2/CPVHj3A6eIbDhfY7hdJWDCdcniIaZ0T1oeJ9n69KpkbTNQHRwge8mykwnAi5wbWr4XDjc1aot/tH7oNMn2KNcV3Mu8iQpIWg4twnBUSI4iyta/dUXQP9znEHzQzLhZgOrv5QGCUXpSBWWJQqaJUxZE3YSjoW1h5ltvZWv/ArMIp1ocJBGQxeLzEIWq7oPfwwIVHS3R/jnARhozVbGIcW+GTsSNChtLAT8FSm7/dB9isirVo5ySdMr2UbmiQrNXB1GfEx0cwMw9wq4pEm111NG2mSZeqbUaQNU80TyUFYHqsRrJ6YMLrnlQiU2q8gLKs6yai4wphVKqMqEBONYrnE5MmbUl2im74KjRrqTv1jiapFmpVClZU6lDu+BKl74LnE5SLrn9VHSdvKqvrCNU8PHNZp2NvctZ+oSVXMOaSzSdYJkpzXKbuCkKKrsmojlJS5Fw01lmkYcnArhYuQtOHhOCjBXZWUdZItt2F4pncKEXa2Z8j/ADWIFM/it0H6lbPsXgarKgqOZkplpDZsSbGY1iy6kuQJO+D0XDuRSgzM0kkABBaDkVGgC0UUeKcPbUa5pEgiCvJO1fBG4ao0MzZXA3P5uXsvZzZAO1fCBWpOEbSOh2Wp0zDxeUY7P08xLo0FvNC6dZ1GpP42O0IkSD9FrOFdsX1H5BSpst+Fs3GqHO56faino9KypsmZQdIABk6WiUWxeHc8MNQw5knxAwOroNwlg+I1K1RjX5Yac2kEQOasUMYGtIcDmL4O8gnw69F5cpyTPby7qmjJ9oeHNND+89+6oXPi9mk6eEbCyzLHQtd2tfGEpyzJFV/hjS7tljaNZuZpOmYTzyzcr0+nk3DfyzwcySlsbrD8CYKbIrVGPLQ4wJbfmFVxXCa4IOWnXabBzfC+3ki+D43QqE93VYcwAykljgBylEKb8okAjKMrZIMucbmQofxGWL3/ALPRj0+Ka9r/AIZiXNGYtDix35Kwj2eoapLTD25T10PkRYrd4qgyoHMeBVDR4s45a5XhZ/GcEc1wZhznDml7qVS4a3aHbE7JsM2OfKr/AAKyYsmPflAPvByCaS3dqdUw0EgSx41pVLf8HbqBtQHoeSa8dbi1kse4M5KOpSYdE+FwsWUEQjDtXThBGq0fZfAU62YPEkI1U7M0TstOUTz1uC3lcdhSt27spS5lMPZSn+Y+67czSYJ2HdKRpuW7PZNn5j7ph7KN/MVtmaDCw5dW3PZRv5ikus7SzMiiV0Ycq6wdFIAFtmUUP7qV0YYojlXRTWWbQLOG6JjsN0RnulT4hXFMQILnfCPqT0C1NsxpJWwTiGAW/EduQ5nkF3h2EfUeKdJpc86u5Df/AEhLBYKpiHllMZnaucTA9foAttwqhSZTY2n4WOkVCbPNQfhedr8l2XKsa+4OPG8svCIuD8GZQbmcA+q1wBLrtYDo4N3HVGG1WirBJLwYzE3ILToBZrdEPq4xlJofUcMgBa4/nGzWjV0c0I4XxqriazA3w02OA0lzybNDiFJjU8k9TKsrx44OC5ZvsPVutAzQLIU6hacpsQtNw6tmYFceUyyVE9kggqZMhcYeedqOAU8r6uTM7TKOYNisy2tiS5zqeFbTLmhvgp5YAINuRtqvXq2GDs1plVmYMJUs2nYqx4VNWYvs87GCS6g0kiMzjHyhT8Q4fjTBaylAIcRJMkaX2W4p4aNlIKA5R1Uzypu6RVolVWzyrtNig6kKTqL2kOzGLid7rLDAMccrXkOjQtm/KQvdsXgmusWid7ILi+y9J9+7E8xAKbizRgqSFZMLk7PHqnC6g0bmjl+yfguLV6BGV7rGcpkifIr0Sr2Zq0S52GrFhcIIIDvmQYWR4hw2pTd/8RTJaTd7frIVKyRnsyd45Q3QQ4d2vY61ZpZOpZdrvNuy0OBrB7c+b/qnM5wOjR8DJ2t9SsXxTs3kaKlJ4e12gm5ETbmh/C+J1MO7wGBu06HoQk5Oli1cB+PqpRkte9Ho/EcEyswtqNJ2puPxhx5OGoWQ4vwh9AjP4maNqt2PI8loOC8aZXgNltTQMJs3mW80Thpa6GyzRwdcP2NtipYZJ4XpfHgsyYoZ46o8+TANqRY+hGh/Yp4Kt8e4UKL/APDksIzOabmmCYGY8uSGt9xsf0KtpSWqJCpOL0yDvZbEZa0cwtySvMsC8sqMd1XpTSSAY1CwdFiLkJ4wKtjTPmiblFVcIgrka9wOatcxCbXfXsQfREw1vVNqhgBcdltg0Ve8qc/mku068icuqS4wAtoDqnCiOZTg9vIpwjqgNoTcMTunGiRuF0H+Jdaeq42iDE1O7YXu0A/oB1WWDqlerDRNR5gdBy8gLn1VztNjczu7Bsy5jdxGnoPqiXZbABjO+cDmf8JGrWD8XqfkmOXpw1dxOl5cmhcBvhuDZRpimCQJhzxq+p57NCr8U4g2gO9MHOcr2ad4Wjw1G8jYAqxjMSGNe58QILwNHT8JbyceSwXEMW7EVC4+TW7NGwH6qXDjeSTb4KeoyRxRUY89vsSYzFVcVVE3JMNaLNaOQHLqvVOA8PbSoU6ZazMxtzlAzOBkGNzP4uqynC8B/cmtcW97XqWpt2A31WvwGCeQHVXEu1gaDoAqpzUVSI8cG3b5DFTBCoL6gCCOe8dAlg2PpGCJbzCo0qsE5HaWsdDGhT8Hxtzf+pB5EXSVnS5OnjRo2AmOqsVcKG/iB8kLocYD4iOgn9CrHeOdqY6Ba88exkMFiqO1AXQADfkDKUKalSmxEjZRTlbsvhHSqHVKO+yjNIawUQpUWgSfaQT7LtVjDEB07yYHohoLUBa2KAdcaruUG4Vytw4G5I8hv76rhoCIAhBHVe42Tg1sDnU9VTxGFaRBAhG6lAxJ9lTxFKQBA8x+qoTEuNmC412RY7x0xldfy/ksXxHBvYYrDT8YAnpPML3TCUY1vKvYXBMNyGE6HM0H6qrHlaE5Onjyj5sIfScDcOFwR9QVr+D9ou8AY5s1rBmzXnYu5Rqrvb3g7RiPCzwVLSLBjgbnyWDxFJ1N0E3GhH1BTpQjljuTKU8MnTPTcPTyh0Q6T/iud/6jiLjoI0WP7RcOGHcHs/6NTQbtP5T+hRbs7xnv25XQag+IHR4GjvMboviKTajHNe3M11nO5csvkVDCcsM9/wBz0JY4Z8S0ft/0yvDXioMp+ICQeY5+YXr3AKTauHY6Nl4i+m/DVjTJ8TDLTsQdPQhe1/2c4kVqByxGoG45j0MhX0rtcMgUnW/KLtThTDshuO4EDpbktUATtvCldgCeSLSd6hgqnZ+ps4aIbjeA1i5rDedY5L0h2AI3AUf9xJMghdpO1mL/APA6jbACAkteaB/N8l1ZoN9Q8gHknPiNFC2odCU4kGxU5RY4MCjxbm02OedGgn2CeHAIR2mrRSDfzOHs3xH6BFFW6BnKotgPAYB1cuzEj+L+N7gPYS4noFruH4mcrHNDH5BlYfhqMAkFh5xeDcITwF80ckzmLiQdW5iGAt5eEVTIRM0swBdcEiQDBaSSYB1BzPbcbU0GeWp0xeB6PcgL2qxpLhSBs3xP6vOg9B9UW7HdnxDa9VsyCW2OVoE3J0m2iyrmZ6pAJdmeQHHUgn4iR0uvRuzfFcxfSYwd3TAYTrLm8iIkfsn16cKQrV6k3JhbhOA7yqa1QXuGD8rBoB1OqMydB8lTp1d/l+yr4nib2khjbAfFcfNefPJb3KFNRRYrhhzMMN3J0/qUI/vGSuGDK4uaI5AQeat42sxjDnaQ4DUHMCeWvzVPDnxBz9REQIt19JS+d2T5JWzQYLDNMOi409EUa9BaVdxtl8o280Uw7Km4EbXv6rKosxtcFyk4aG3I/upgCNpHSx+ZUFJp3bPQohSw7HDQjp92WcjW6FTok6E/fyTHvyzJaNrkAeqjxWAawF0mL2Fj7iwXmvF8SXVHEkxNpNoG65Rt0Ow4vU3s9KoYprjDagJ5CLeythjj/NeSU6xafA49HCfuP5LV8D7UOZarUc5kbkE5t+pCLS1yMn0r+g1+Ko6Sh+iZQ4/TreFsydBfY9BC48unREpE/pyjtJEoPok6sAquoJ35bKJlN0o0wlEC9psCKzC13Mn+i8v4pwx1NxpvuPwO5cvQr3XD4XNtP6+iodquz9KrRc3IA43aY0PoqMWTSS58Wp7cngNGu+lUzCzmn+o8l6Nw/GCq1tRoJDhZo0B0c0/ust2t4AcM5oLs7oh5AgA3IjnaLqLs0XObVpd4Wt8Jyj8Rccok7NnLMc0fUQU46hHT5ZYpOIS47QGIcxtO7mWfV/AGyARP4i0uExpdaX+yHippYt2GfbPmtyeyzh6i/oUPIyMa0gBgBIZyZcuaQLz3bn/+0EP4hjzRxdLENADmw6G65qb3CoDucwm51DkPTz3Uex2ZczfJ9BViATY81Lh3jT6qGnVzsa8XDgCOoIkJBWk5bewbqMBu0J5Dui5kPILjBhw7eSSeQ7okuOPnhvkusKkZQMpPbyUZeckLO9qn+JgGzXH3IH6LRAELK9oq+ap5Nj2cmY/kKzfEO4PCsDaJDswDW5XN8LhY3/hk1gY3TKjy2k95JJA8LhzeHEZh51gZFrDRVeDYwlgc9pDGw3O0ZgC3uYDhqBFLX+JWuKVM2HLrGcoLh+I/4ZJtafD8klxeqn5MtabRU7M4AuL6u1Npj/XlMW+9VsuyWFbRpAnSC59pJcRN+V0J7HUXdwXZTGcmdrNi/iFpHXTTdWcJWIe7IXDMC0xfnJy2tEj0RdQ9qJ70hHDcWL6hJaMrpIAtEbR97IriuHd6yXENGpBtbU3QLCYIMc1ziYBvAgkA6H5Ipx3jTIawNvo4aCD+E2vPKFC1daTlL27grHYdjMvd1OkE2jmOt0/MLZi47xytqumlTeJDrnYAyANLwnYKgx73UyXFgggE38pEX0TKpAVuGOFY9paQT49m6kjmOaIjGMBF5J5XPUlB3vp0gQ3KIHxchyP3sreAwgqQQ4EbEGDKWyvHklwjR4KsHWzHnpKIVq7WNlxsPl6AIJhWilIzRzJM/YTeIYB1QeOqGsM2JOnQDZAXY438gNx7te05mgSzQXIk+5sguF4qXAEME7GGfQjlPnZMx3DaQfFN4fF3ENiIO2ab6XCuYGqG+EMDnExkJygdTzEX9dUdJLZHoQjKP2Xgqd08icnnOUG9zrontwNYN+FuXS+V3lGpSxhI1LcxuSCCDEH0/n6qZ9U5Q7Q2ttIMnrpp5eqLeh9WXMOCI71r2ERETsPynXQclp+D4gPZbYxpHUfVZ2lxkkgQBclxtJzakxHPSYlHeGiZe0yDqYgeyUrUhHUL27l6o0apzXg7JFkrgYnWyEmYY0UfEPE0b809rU8N2RqwTyvt3Qc4uDrk+JpiIDdp0WG4RVDKzSbNdLHEbB1p9DB9F652ow0h0XAN43G/yXjuJGVxA2Jj0Nlbj90KPOzLTOzaMe4VCHSxhBkwM5B8ehkN1q8zBiyo8WwAbQD5aMrxMnxPOXu3DmTNOb9VdrVWtac2VodMvd+V5qRroB3guOqFcfx4LS0MdD3S15BaCG1HPloNyP8AEcNtd1Li1alQ7JWl2e3f2b4vvuG0OdMGn/7biwfJoWlY/wAl55/YvjP8CpS5PJA8w0n5n5r0AiLSF6JIStqzuFIAVFStyKkznouMHwkugpLTD5+dV6eyQfIVZ9jZSUQSN1CehYsfUDKZPssTxJslp6OH0haXj1SA1vqs7jRLfI/y/VNx7MTm3Qb7HPmm9sxDwbcnNj6hSdoaQDA5oAl3iiwd4ZBLdJ1Q7shWio5n5hbnLTI/VHeP0c1F3MEO0g2sbb2KTP25hkEpdO/KJ+x9UOoObMZM2YRMg3G0jXb8qL9nKdI1XGtUaMoIY5ujgb+XNZjslUkVqUkSMwNzFiLD7lG6VRlEASXOJkZWkn+Xuu6hXsR+AthMPTrYu9TwC5jVwbo3ykodxjAtNZ7gHNaLsBDtBAiALCQk6sGkPzRlMwI0mSImyL4PG06rSfGSRqQ4CecjXfWFLvFrYGk9mAcJWphpDpL9ZbHwwPzX52nRGMLiqWUgtvzA1EWvCFjgFWpLqbLT8WYgwDcBpkH5b+nK+IewAkkObtlByxpIiLTEQmS3WxibXYsOw8yRBYItIg25adUR4RxBjYaQYO4iB1hD+EcSa34y1weYEw3KSIsLKXvqAeXXLZvDZDfK4vO3ySpRt78B49naNzgarH2LmO2vr891cxFBxDu6qZXHQ/EB/tBBn38lj8OTUeYINKIiIM7X2Ww4Q9xpiWADQAjYaW/VDVM9KMu6MBxPhWJpvJc2CYlzDIMEHNtuBYhV20u6aXEESDEmDYCNR8MnQdEd7S8YpVTlLHSzlEZd/Fq3QHl+gqlh2OaajnupMdZjq13O2mGg+G8ZoAvqZuav9j1I5PanLkoNzzpoRJPS8ybAmTrHkniq0AAB0kaxEmRoYMzy/VPxuFqUT8OYOuyoDmpnkQ4f16LuB4dUrQ1rC6IBMQ0AdZFzzPIXOxOhiltaIqTx4c06kGNettjHNegcKp0QwdyHluxNp9gqHAOzgpnNUYXHq0imI0OZxDXHW8EXK17QReTpoTaPKwQPdkfU518UBc1r2UlI87hW6rATpBvbbmqTagOny/ZFEmuywAE+owx4T5qvmUlCpe6cmc0ZftFTa1rp9/PkfVeM8Vb/AItQ6S4r3DtfSHd1dCC3NB0sN+i8Vx5zOLuZP1j9FRhezI+oW6NNwPDtcylUfBflHjf4sokgBoNm2AQrttUl9CTJyOJ9Xf8A8o9w5gZSYCRZjJtmuBfoLkrMdqH58VlknKGtv/yP/wCSnwe7Nf6lPUpR6dLzRv8A+yyt3bmu2dUc0+rKY+oXrlWgCZj1Xi/Z0OZh6bhqSag9Xkt/7cq9kpVDVpMe1xEgG3krYO20QzjSTLLf9Kd6BVRRd+ZymotIcSZMpoomk8kk9JcYfPApx9hMfV5JzgSnNw8XKiPQM7xmpNTyCoPggg7q/wAY/wCqdEOfKbETIgwVc06jHjUG/nP0W9dlczfK4W8nC/rBPssDWp38/qtD2dxGdpYXva8aZXctfCZHXTmh6iGqOpdjunnok4+Slgq/93xHiGYA5XA6ET9NFtOD0aFVpbSzUy0loaXZmW2DjcdJWY7Q4BwipObQOkAHofDY8ttlzs7xDuXg6tJAdvDiTHUCPmT0WXrhaFOOmWmRpHYaKgY5okG0HrOkfqiVTib2tgMOUb6NH3BulVotrRVJLYFuXmdwUOx8DwA1HtMAGdz681I1q2YDVXQewPGixmV4E6tvOunwze8QguIqZnE852nNeT5bqWnwus0NqVJbmgAEzAmwv7q8ynSDXd45wsHCGjYEC0E87dVlKO5tPuQYXACsW5m+AiCNz08J+YhX28DZTcMwdlF2gjwj9zpsn8Bow5jtRczoGxYCLcuS1UZgQ7U6G+vLRc9yjFiVW0V+HYQSCYgaCQiWJeXSxroJEWAOUdJ1P8lSw1FrReRcmNT6dFYZVp3AzHyBAPrKW7K0gd/5dZY+Cf45I8+70PqFyp2epuOd5dUdzJLW9IiSR7I4yIs2POCn02DVzWx5R+qGtxnrTXcFUuBUmjK1sMkGJcRI87e6I4fhwaAJgD4QYAHk0ABWO92a1xjkI+ZMqIOBhxjcc7+QmdV1IB5Jy5ZOGDXNPW39AmVJ2/SfcldFUam3nY+1ym98PwgHrmj5IthasrPBBzXnb70VN0DTT7lXKp1LmR5H76KvXaHgR81sRiGtqDT6HRRVHkaa3S7ggzzF/PaVR4iNc8wYtt5/1TVudqoB8a44GPzuc6A0jKA0giZNifF+0rzamw16wn8byXbWJzO06StN2yxzMmRpJc6OVgDJJMemv8hvZ/AE/wCJLhs3Lln+Iy4EDl7qltQhZIryToOOeA2SfDEutZrRc300ELBYYurVnP8AxPdb/U8w0ek/JGu1ddrGBoLy9/5qjjDBvlBy3PTmpOxHDiamci1MT/vcCGj0bJ8yFnTRUYuQXVTc5qHg2FGhlaGt+FoDW+TRA+QXoXYjE5sPlOrCR6aj6rCPqDQBaPsHXy1ns2e2fUf1R4n7js0fZ+hs6NUwM0bz+i53rv4dU5zhJGX5J3eCND7KoiJO8bzCS6GpLjD52BI0ifNOIcf6quxvX5J+lzHzUdF9gPjNIip6Ie71RXjx+F0W0Qd7/NMjwJlyMqLuGrljg9uo1jlsQmuPVRh8EHl9wUxCpG6wddtenOsiHNEb/ofvRBA1+ErZrlvp4mbg9VQ4fizTPeN+GYcPyk7HoVqHGniKZ0j0lp2/rupJJ4ZX9LKU1njX1L+wrwV3fBzQ8gZc7CYIIsC0jmCYhXcJwF0jvHgtBzQBodz9IWFwj6mGfBJjYjQjmP26r0rgPFW1m5ZGcNDrWkbwDuF04LlC4RTdSW4/D4fMC2o0loByTsYsQP1UHDOCZnh1Rzmj8QzEkm17WaNeamx+FqveCxxaPcexRTCUy0Qbn7+SndjY403TRbw7GMORoaW7TqNT+/urTLaADyF/5KrAF9VKx8ch0jX30XWPqix3o0N+U2I53KbTZJ1+dkyo8Rcnz1XaFO8kwEErYQRptAG9um/Ic0nNuJa5x6RA9zHtKr97e3lfly6Lv94a3wkifMlvuhYNMsubt8pH7rrWQLDUk38gqjqrtmA31lsR5ypMTlcAGk+HU31JldSo7cn7wbuvyE/uk7EDS/31VXPsHNMD8RJM/VKoyRrE8rz73RJozSSOrSbev3uoXO02+SRpZdCJ6n9FC5xsJAOwn+SNGnKzo3gfe6yHaniRYwi0b843HnH1RTjOPDRBIETMwLjn0XmWLxNTEvyiSCZi14m5tYCU/HHuxOSXZFPC4d1epGg6/haP1/UrTYioyjSzEQ1g0Dh5Aef7lcweGZRZqObiR9wOn7rKca4gcQ/I21Nskn6uPXkFm+addkMVdPC38mVH1nVqpquGa4DW83GzGD5fZXo/BsCKFFrJk/E8jd5+I+Ww6AIB2P4QHEV3ghjZFFu/Woep2/otfVw8xB1T5yXxQjFB/JnM5i0ffmrPBa5p4inUJ/EAbiINv1VdtExqmmk77hLTpjmrVHrTwNSY9YXA1p3/AO5U8BUFehScRJIBN4uNfmrDKAGgHW5Vp53BLlHP5pJnddB80lpx8/0iOSdrsocxi5UrSYi6jLirxOlnpkRcXCy7oWzFGdVmuK4Lu39DcfsjiwJruDX0/JVqg8lbe0Ku8DZNQhjcPinUzb1BuD0I9UX4dUfJqUAfCJezUtG5jdqA1GqXh+PfReHscWub8LmmHD9x0NiiaTVMDh2bLC1GYhozVHE7t8AvzHhlcqUKlBwe0y2fuY080CqcSbUOd0Mef/UpiGE/xsHwnqEWwXGXNgVQC3Z4uPfQ/VSSxyg7juvBRGcJKpc+f9m34FxYVG+BxDgLsJvMXAnUdf5rR0MSHAEESdREXXnlLDMqDPSflI5Wg+Qu30U9LieIoOBdJj8WvP8Aol+2fH8DlqhzuvJ6C56kY/z9VmsH2jpus6PSeV7FGqVcOAyukapbg0MU0y+Kvoul3MHlM29lWa5PaeqBoInbOxkJ9QRtI8491GGjdx9kh0J+iE2ySk8TkMCfhPI/srTKkGHWOkix99whrnxZynfjgGiDPSFiiY2WK7zrNuYFvcKGib6+uips4g5pJLAB+YOj3GipY3tPSYCYHvY/fRHGDYLkkE6sj6+yz/FOPNohxkmNI+77oHxDtPVrS2m2x01geQVChwlzzmquJOuWT9dvRN0xhvIC5T2iinia1XFvP5eu3mfeyvNwlOg2SSLXcHEE9IH0XOIcWo4dsCJ/KII/msrj8c+qc1Q5W7MHxGdg3ZHGM8v2RknjxLzIfxTijqxLGud3YNy4zHrueit8A4MKpDi0iiLgHWqeZ/hVvgnZsvAfWGVguylHzed/JaucttoAA/QJ9qK0xExg5PVIkoVW6ZYHIWVptVnIiOqr03bOa70TnwNz6tSihD3MB/EVynRMyH+l1A517eafTqFcaj0DsXWmi5kgljvk6/1laBeUYHidWkXOZULSYBsDMaWIVo9pMTqa59mj9E+OVJUyaeFuTaPTUl5We0uI/wA5/vCSL1l4A/DvyYhik7wqJhUjYSB45r5UHEML3jIsCLhWcnJRuBC41mPq0yJ5jVQPYtJxbhuYZ267jmgD2p0WTyVFCqxV3NRCrTVSoExMW0RU3ltwfvqr+CxRaPC7LOrTdh9NkPU9MWRME0lLF0msa4ONGrMESSw9WkaBGMJx54H+I3O38zTI9x/JY2jMfcJ05PE0uYf4T/8AqkzxxnyhkMkocM2L67KhzNhvkrOHrVW2a8kflPiB9Dp6LHUeKOJnwPPMeB6us4sBcmow/wATcw92ofSa4CWRPk2tDjeIZDXCfS/TUXV2l2kdF6Z6/c/osbhuPu2qMd0Jj5ORShx529Mn/SWn9UmUJL6R0ZryaGn2qH+U70lTHtUABNOOuVx9z+yAHj7fyvH/ANv9kh2gb/l1P+B+iXpl+UPUvzB3/wA2uItTPnH7qnX4/iXXbTj2n5XVFvHJ0o1Sf9EKxgqWNxBy0cI82nxvp02xz8RWxhO9oguUfzFHE1sS+7nQJm373KqdwJky483Gfqp+OUq1F2TEYjCUj+VrzWf/AMW73QXE4igPx18QPLuKf/deE+OOffYTKcewYHG2URldlJ2Dfi+WqpcQ4rWeJJFBh3efEfJmpPmgNbjIbIYGUhypDM71qOQqrjiTI13cTmd/yOiKPTxTujHnk1V7BGtig24kH877vP8ApZsi3Y7hvfP71w8A0m5cep/RA+AcHfiqkQcou536SvVcFhG0mBrRAFtrH3RTklsdjhbsnaBOhI6TtsozVk3keeikLyNfnf0kFcqt0IbOqQVIc2pHLzab+xXWuDvxe4UYpQLQPdccSB1XGkFYQT4hKdQadbz0UbzJuFJh6o5+644ldUd9hdLpF07vDHMDUKN2Wxu39+qyjrHgs/L9f3XE1obH8klp1mVDvVP3SSRCxzTClYZXUlhp0AfYQni/CM0vZY7hJJanRjSZm6rPNU6tNJJPRMyq4XVhiSSMWWGFdzJJIQiniaMXGijZXcNHH3/RJJGgWS/3t24a7zaP0Thix/lj0c4JJLjCVuPA/wAweVQqccX0h1af/qJJLqOOO4xOpqnzrOH0XHcX/wDlg/63vf8AIlcSXUaRHilTRuVg/ga0KpUqud8RJ8ySkkuOGwi/Z3gb8U/K2zR8RkfJJJDJ0goK2emcL4fSpMDKeo+qIU6ROh+/NcSUtllbC8Q8JvzvP7KZovcdQNdteiSS41CI3PpqmVaYEEg3vPNcSWGkYINo3j1UgpgTN+Q/dJJcacrYdpuLe6YaZA1skksOKz9Tb6JJJLQT/9k="
            };

            restaurantSelect(response);
          }}
        >
          <Marker
            coordinate={{
              latitude: markerLatitude || latitude,
              longitude: markerLongitude || longitude
            }}
          />
        </MapView>
        {error}
        {footer}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  restaurant: state.restaurant
});

const mapDispatchToProps = dispatch => ({
  restaurantSelect: values => {
    dispatch(restaurantSelectAction(values));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen);
