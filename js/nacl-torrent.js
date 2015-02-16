(function () {
    var NaClTorrent = null;

    document.addEventListener('DOMContentLoaded', function () {
        if (NaClTorrent === null) {
            attachListeners();
            NaClTorrent = createNaClModule();
        }
    });

    function moduleDidLoad () {
        console.log('module did load:', NaClTorrent, NaClTorrent.postMessage);
        NaClTorrent.postMessage("hello");
    }

    function handleMessage (event) {
        console.log('message:', event.data);
    }

    function attachListeners () {
        var listener = document.getElementById('nacl-listener');
        listener.addEventListener('load', moduleDidLoad, true);
        listener.addEventListener('message', handleMessage, true);
    }

    function createNaClModule() {
        var torrent = document.createElement('embed');
        torrent.setAttribute('id', 'nacl-torrent');
        torrent.setAttribute('type', 'application/x-pnacl');
        torrent.setAttribute('src', '/nacl/torrent.nmf');
        torrent.setAttribute('height', 0);
        torrent.setAttribute('width', 0);

        var listener = document.getElementById('nacl-listener');
        listener.appendChild(torrent);

        return torrent;
    }

})();
