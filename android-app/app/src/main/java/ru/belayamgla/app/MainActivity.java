package ru.belayamgla.app;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.webkit.CookieManager;
import android.webkit.DownloadListener;
import android.webkit.ServiceWorkerController;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.Toast;

public class MainActivity extends Activity {
    private static final String HOME_URL = "https://belaya-mgla-sova58.github.io/";
    private static final String SITE_HOST = "belaya-mgla-sova58.github.io";

    /*
     * App-only performance layer. It never changes the public web site.
     * Expensive blur/transition effects are disabled inside Android WebView,
     * reveal blocks are forced visible and non-critical images become lazy.
     */
    private static final String PERFORMANCE_JS =
            "(function(){" +
            "if(!document.getElementById('belaya-mgla-app-performance')){" +
            "var s=document.createElement('style');" +
            "s.id='belaya-mgla-app-performance';" +
            "s.textContent='html{scroll-behavior:auto!important}' +" +
            "'*,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important}' +" +
            "'.reveal,.in-view{opacity:1!important;transform:none!important}' +" +
            "'[style*=\\\"background-attachment:fixed\\\"]{background-attachment:scroll!important}' +" +
            "'body{background-attachment:scroll!important}';" +
            "(document.head||document.documentElement).appendChild(s);" +
            "}" +
            "var imgs=document.images;for(var i=0;i<imgs.length;i++){" +
            "imgs[i].decoding='async';if(i>2&&!imgs[i].hasAttribute('loading'))imgs[i].loading='lazy';" +
            "}" +
            "})();";

    /* Warm a handful of likely next HTML pages while the phone is idle. */
    private static final String PREFETCH_JS =
            "(function(){if(window.__bmPrefetchDone)return;window.__bmPrefetchDone=1;" +
            "var seen={},u=[];document.querySelectorAll('a[href]').forEach(function(a){" +
            "try{var x=new URL(a.href,location.href);if(x.origin===location.origin&&/\\.html$/.test(x.pathname)&&!seen[x.href]){seen[x.href]=1;u.push(x.href);}}catch(e){}" +
            "});u=u.slice(0,10);var i=0;function n(){if(i>=u.length)return;fetch(u[i++],{credentials:'same-origin',cache:'force-cache'}).catch(function(){}).finally(function(){setTimeout(n,220);});}" +
            "setTimeout(n,1000);})();";

    private WebView webView;
    private ProgressBar progressBar;
    private boolean offlineShown = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setStatusBarColor(Color.rgb(3, 20, 38));
        getWindow().setNavigationBarColor(Color.rgb(3, 20, 38));

        FrameLayout root = new FrameLayout(this);
        webView = new WebView(this);
        progressBar = new ProgressBar(this, null, android.R.attr.progressBarStyleHorizontal);
        progressBar.setMax(100);

        webView.setBackgroundColor(Color.rgb(3, 20, 38));
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        webView.setOverScrollMode(View.OVER_SCROLL_NEVER);
        webView.setVerticalScrollBarEnabled(false);
        webView.setHorizontalScrollBarEnabled(false);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            webView.setRendererPriorityPolicy(WebView.RENDERER_PRIORITY_BOUND, true);
        }

        FrameLayout.LayoutParams webParams = new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
        );
        root.addView(webView, webParams);

        FrameLayout.LayoutParams progressParams = new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                dp(2)
        );
        root.addView(progressBar, progressParams);
        setContentView(root);

        configureWebView();

        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState);
        } else {
            Uri deepLink = getIntent() != null ? getIntent().getData() : null;
            if (deepLink != null && SITE_HOST.equalsIgnoreCase(deepLink.getHost())) {
                webView.loadUrl(deepLink.toString());
            } else {
                webView.loadUrl(HOME_URL);
            }
        }
    }

    private void configureWebView() {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setLoadsImagesAutomatically(true);
        settings.setBlockNetworkImage(false);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setMediaPlaybackRequiresUserGesture(true);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setSupportZoom(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setUserAgentString(settings.getUserAgentString() + " BelayaMglaAndroid/2.0");

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            try {
                ServiceWorkerController.getInstance()
                        .getServiceWorkerWebSettings()
                        .setCacheMode(WebSettings.LOAD_DEFAULT);
                ServiceWorkerController.getInstance()
                        .getServiceWorkerWebSettings()
                        .setBlockNetworkLoads(false);
            } catch (Throwable ignored) {
                // Some vendor WebViews expose partial Service Worker support.
            }
        }

        CookieManager cookies = CookieManager.getInstance();
        cookies.setAcceptCookie(true);
        cookies.setAcceptThirdPartyCookies(webView, true);

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                progressBar.setProgress(newProgress);
                progressBar.setVisibility(newProgress >= 90 ? View.GONE : View.VISIBLE);
            }
        });

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return handleUri(request.getUrl());
            }

            @Override
            @SuppressWarnings("deprecation")
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return handleUri(Uri.parse(url));
            }

            @Override
            public void onPageCommitVisible(WebView view, String url) {
                super.onPageCommitVisible(view, url);
                if (isSiteUrl(url)) view.evaluateJavascript(PERFORMANCE_JS, null);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                if (!url.startsWith("file:///android_asset/")) {
                    offlineShown = false;
                    view.evaluateJavascript(PERFORMANCE_JS, null);
                    view.evaluateJavascript(PREFETCH_JS, null);
                }
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                super.onReceivedError(view, request, error);
                if (request.isForMainFrame() && !offlineShown) {
                    offlineShown = true;
                    view.loadUrl("file:///android_asset/offline.html");
                }
            }
        });

        webView.setDownloadListener(new DownloadListener() {
            @Override
            public void onDownloadStart(String url, String userAgent, String contentDisposition,
                                        String mimetype, long contentLength) {
                openExternal(Uri.parse(url));
            }
        });
    }

    private boolean isSiteUrl(String url) {
        if (url == null) return false;
        try {
            Uri uri = Uri.parse(url);
            return SITE_HOST.equalsIgnoreCase(uri.getHost());
        } catch (Exception e) {
            return false;
        }
    }

    private boolean handleUri(Uri uri) {
        if (uri == null) return false;
        String scheme = uri.getScheme() == null ? "" : uri.getScheme().toLowerCase();
        String host = uri.getHost() == null ? "" : uri.getHost().toLowerCase();

        if (("https".equals(scheme) || "http".equals(scheme)) && SITE_HOST.equals(host)) {
            return false;
        }

        if ("about".equals(scheme) || "data".equals(scheme) || "blob".equals(scheme)) {
            return false;
        }

        openExternal(uri);
        return true;
    }

    private void openExternal(Uri uri) {
        try {
            Intent intent = new Intent(Intent.ACTION_VIEW, uri);
            startActivity(intent);
        } catch (ActivityNotFoundException e) {
            Toast.makeText(this, "Не удалось открыть ссылку", Toast.LENGTH_SHORT).show();
        }
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        webView.saveState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.stopLoading();
            webView.setWebChromeClient(null);
            webView.setWebViewClient(null);
            webView.destroy();
        }
        super.onDestroy();
    }
}
