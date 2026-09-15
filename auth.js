Il2Cpp.perform(() => {
    const image = (name) => {
        return Il2Cpp.domain.assembly(name).image;
    };

    const klass = (image1, name) => {
        return image1.class(name);
    };

    const weirdclass = (image1, name) => {
        for (const currentclass of image1.classes) {
            if (currentclass.name === name) {
                return currentclass;
            }
        }
        return null;
    };

    const method = (klass1, name) => {
        return klass1.method(name);
    };

    const replacemethod = (method1, funktion) => {
        method1.implementation = funktion;
    };

    const SystemImage = image("System");
    const UriClass = klass(SystemImage, "System.Uri");

    const AcImage = image("AnimalCompany");
    const UnityWebRequestAdapterClass = klass(AcImage, "AnimalCompany.API.UnityWebRequestAdapter");
    const EditorRequestAdapterClass = klass(AcImage, "AnimalCompany.API.EditorRequestAdapter");

    const OculusPlatformImage = image("Oculus.Platform");
    const CapiClass = klass(OculusPlatformImage, "Oculus.Platform.CAPI");

    const TomahawkImage = image("TomahawkGamePlugin");
    const TomahawkGamePlugin = klass(TomahawkImage, "Tomahawk.TomahawkGamePlugin");
    const weirdtomahawkclass = weirdclass(TomahawkImage, "<>c");

    const replacedTokenUrls = [
        "https://animalcompany.us-east1.nakamacloud.io/v2/account/authenticate",
        "https://animalcompany.us-east1.nakamacloud.io/v2/account/session/refresh"
    ];
    const tokenUrl = "put the url to your token here";

    replacemethod(method(CapiClass, "ovr_UserProof_GetNonce"), function() {
        return Il2Cpp.string("null.client");
    });

    replacemethod(method(CapiClass, "ovr_Message_IsError"), function() {
        return false;
    });

    replacemethod(method(weirdtomahawkclass, "<ValidateClientAsync>b__57_0"), function() {
        return 3;
    });

    replacemethod(method(TomahawkGamePlugin, "tomahawkCoreInitialize"), function() {
        return 0;
    });

    replacemethod(method(TomahawkGamePlugin, "MapNativeCVResult"), function() {
        return 0;
    });

    replacemethod(method(TomahawkGamePlugin, "tomahawkCoreGetStatus"), function() {
        return 3;
    });

    const SendAsyncMethod = function(method, uri, headers, body, timeout, cancelToken) {
        const url = method(uri, "get_AbsoluteUri").invoke().content;
        for (const oldurl of replacedTokenUrls) {
            if (url.startsWith(oldurl)) {;
                const newUri = UriClass.new();
                newUri.method(".ctor", 1).invoke(Il2Cpp.string(tokenUrl));
                uri = newUri;
                break;
            }
        }
        return this.method("SendAsync").invoke(method, uri, headers, body, timeout, cancelToken);
    };

    replacemethod(method(UnityWebRequestAdapter, "SendAsync"), SendAsyncMethod);
    replacemethod(method(EditorRequestAdapter, "SendAsync"), SendAsyncMethod);
}, "main");
