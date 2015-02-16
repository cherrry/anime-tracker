#include "ppapi/cpp/instance.h"
#include "ppapi/cpp/module.h"
#include "ppapi/cpp/var.h"

class TorrentInstance: public pp::Instance {
    public:
        explicit TorrentInstance(PP_Instance instance): pp::Instance(instance) {}
        virtual ~TorrentInstance() {}
        virtual void HandleMessage(const pp::Var& var_message) {
            PostMessage("hello world");
        }
};

class TorrentModule: public pp::Module {
    public:
        TorrentModule(): pp::Module() {}
        virtual ~TorrentModule() {}
        virtual pp::Instance* CreateInstance(PP_Instance instance) {
            return new TorrentInstance(instance);
        }
};

namespace pp {
    Module *CreateModule() {
        return new TorrentModule();
    }
}
